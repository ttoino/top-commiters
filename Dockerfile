FROM node:current-alpine AS build

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY svelte.config.js .
COPY tsconfig.json .
COPY vite.config.ts .
COPY .env .
COPY static static
COPY src src

RUN yarn build

FROM alpine:latest AS prod

WORKDIR /app

RUN rm -rf ./*

COPY --from=build /app/build .

CMD [ "tail", "-f", "/dev/null" ]
