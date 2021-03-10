FROM node:15-stretch
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm i -g prisma
COPY . /app
