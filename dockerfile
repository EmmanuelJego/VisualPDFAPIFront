FROM node:16.14.2-alpine as base

COPY dist/ssr /app

WORKDIR /app

RUN npm install

EXPOSE 3000
CMD ["node", "index.js"]