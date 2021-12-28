FROM node:alpine as build
WORKDIR /app
COPY app/package.json /app/
RUN npm install
COPY app/ /app/
RuN npm run build

FROM docker.io/library/nginx:latest as www
EXPOSE 80
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/entry.d/ /docker-entrypoint.d/
COPY --from=build /app/build/ /usr/share/nginx/html/
