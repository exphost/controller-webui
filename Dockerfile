ARG APPIMAGE=registry.gitlab.exphost.pl/exphost-controller/webui-app
ARG APPVER=latest

FROM ${APPIMAGE}:${APPVER} as app

FROM docker.io/library/nginx:latest
EXPOSE 80
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/entry.d/ /docker-entrypoint.d/
RUN echo "--from=${APPIMAGE}:${APPVER} /app/build/ /usr/share/nginx/html/"
COPY --from=app /app/build/ /usr/share/nginx/html/

