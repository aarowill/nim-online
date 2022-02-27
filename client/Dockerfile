# syntax=docker/dockerfile:1

#
# Build
#
FROM node:16-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

#
# Deploy
#
FROM caddy:2.4.6

RUN apk --no-cache add curl

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/build /srv

HEALTHCHECK --timeout=3s --start-period=10s CMD curl --max-time 2 http://localhost:8080/health
