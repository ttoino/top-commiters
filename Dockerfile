FROM node:current-alpine AS build

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

FROM node:current-alpine AS production

WORKDIR /app

RUN rm -rf ./*

COPY --from=build /app/package.json .
COPY --from=build /app/build .
COPY --from=build /app/src/lib/countries.json .
COPY --from=build /app/populate.sh .
COPY --from=build /app/run.sh .

RUN apk add bash jq curl

RUN yarn --prod

RUN echo "0 0 * * 0 /app/populate.sh" | crontab -

EXPOSE 4000

CMD ["./run.sh"]
