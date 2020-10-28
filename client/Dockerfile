FROM caddy:2.1.1-alpine

RUN apk --no-cache add curl

COPY Caddyfile /etc/caddy/Caddyfile
COPY build /srv

HEALTHCHECK --timeout=3s --start-period=10s CMD curl --max-time 2 http://localhost:8080/health
