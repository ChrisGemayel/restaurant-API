FROM node:8

RUN apt-get update

RUN apt-get install -y pkg-config libcairo2-dev libpango1.0-dev libpng-dev libjpeg-dev giflib-tools libgif-dev

EXPOSE 6003

EXPOSE 27017

COPY . ./API

WORKDIR API

RUN npm install

CMD ["node", "server.js"]
