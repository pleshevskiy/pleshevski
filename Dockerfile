FROM node:16.14.2-alpine3.14

WORKDIR /app

RUN apk update \
  && apk upgrade \
  && apk add --no-cache bash git openssh make

COPY package*.json ./

RUN npm install


COPY . .

RUN make build \
  && npm prune --production \
  && apk del bash git openssh

EXPOSE 30000

CMD make start
