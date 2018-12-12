FROM node:8.14-slim

RUN npm install -g yarn

RUN mkdir /app
WORKDIR /app
COPY ./package.json /app

RUN yarn
RUN yarn add -g @babel/core @babel/register
RUN npm i -S babel-register

COPY . /app

CMD yarn start
