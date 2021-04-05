FROM node:12-alpine

COPY ./package*.json ./

RUN npm ci

COPY ./ .

CMD ["npm", "start"]
