FROM bitnami/nginx:1.23.3
COPY dist/. /app/

VOLUME /opt/bitnami/nginx/conf/server_blocks/
VOLUME /app/public/cim
VOLUME /app/public/conf
VOLUME /app/plugins