FROM node:12

COPY ./package*.json ./

RUN npm ci

COPY ./ .

CMD ["npm", "start"]