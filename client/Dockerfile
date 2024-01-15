FROM node:14-alpine

RUN apk update && \
    apk upgrade && \
    apk add --no-cache bash git openssh

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install

CMD ["npm", "start"]