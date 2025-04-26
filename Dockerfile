FROM node:current-alpine AS build

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN corepack enable
RUN pnpm install --frozen-lockfile

COPY svelte.config.js .
COPY tsconfig.json .
COPY vite.config.ts .
COPY .env .
COPY static static
COPY src src

RUN pnpm run build

FROM alpine:latest AS prod

WORKDIR /app

RUN rm -rf ./*

COPY --from=build /app/build .

CMD [ "tail", "-f", "/dev/null" ]
