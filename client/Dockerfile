# Build stage with node
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

# Run stage with Caddy
FROM caddy:2.1.1-alpine

RUN apk --no-cache add curl

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=0 /app/build /srv

HEALTHCHECK --timeout=3s --start-period=10s CMD curl --max-time 2 http://localhost:8080/health
