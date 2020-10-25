# Build stage with node
FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

# Run stage with Caddy
FROM caddy:2.1.1-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=0 /app/build /srv
