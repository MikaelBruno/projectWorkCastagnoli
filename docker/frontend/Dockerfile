FROM node:alpine3.19

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]