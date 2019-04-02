FROM node:latest

COPY . /usr/app
WORKDIR /usr/app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    vim \
    && rm -rf /var/lib/apt/lists/*

RUN npm ci

#RUN npm run start
