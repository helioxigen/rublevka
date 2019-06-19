FROM nginx:1.16-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY ./conf/* /etc/nginx/conf.d/
COPY clear_cache.sh /clear_cache.sh
