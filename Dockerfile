FROM node:16.14.2-alpine3.14

WORKDIR /app

RUN apk update \
  && apk upgrade \
  && apk add --no-cache bash git openssh

COPY package*.json ./

RUN npm install \
  && apk del bash git openssh

COPY src tsconfig.json ./

RUN npm run build \
  && npm prune --production

COPY static ./

EXPOSE 30000

CMD npm run start
