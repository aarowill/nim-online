# syntax=docker/dockerfile:1
FROM node:16-slim

RUN mkdir /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

USER node

RUN npm ci --only=production

COPY --chown=node:node . .

RUN npm run build

HEALTHCHECK --timeout=3s --start-period=10s CMD node health-check.js

EXPOSE 8081
CMD ["npm", "start"]
