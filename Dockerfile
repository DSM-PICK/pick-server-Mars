FROM node:12

COPY ./package*.json ./

RUN npm ci

COPY ./ .

CMD ["node", "cross-env NODE_ENV=not_dev src/app.js"]