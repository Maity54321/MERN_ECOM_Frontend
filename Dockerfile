FROM node:20

WORKDIR usr/src/app

COPY package*.json ./

RUN npm i

RUN npm run build

COPY . .

ENV REACT_APP_MYENV=stg

#Expose Port
EXPOSE 5000
