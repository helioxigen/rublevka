FROM node:10.15

RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.7.0
RUN yarn global add serve

RUN mkdir /app
COPY ./ /app
WORKDIR /app
RUN yarn install
RUN yarn build

ARG SERVER_PORT
ENV SERVER_PORT ${SERVER_PORT}

CMD echo "Run server on port: ${SERVER_PORT}"\ 
  && serve -s build -p $SERVER_PORT