FROM node:current-alpine AS dev

WORKDIR /app

COPY . .
COPY src/lib/countries.json .

RUN apk add bash jq curl
RUN yarn

CMD ["yarn", "dev", "--host"]

FROM node:current-alpine AS build

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY static static
COPY src src
COPY svelte.config.js .
COPY tsconfig.json .
COPY vite.config.ts .

RUN yarn build

FROM node:current-alpine AS prod

WORKDIR /app

RUN rm -rf ./*

RUN apk add bash jq curl
RUN echo "0 0 * * 0 /app/populate.sh" | crontab -

COPY package.json .

RUN yarn --prod

COPY --from=build /app/build .
COPY src/lib/countries.json .
COPY populate.sh .
COPY run.sh .

CMD ["./run.sh"]
