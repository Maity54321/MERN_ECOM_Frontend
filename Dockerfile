FROM node:20

WORKDIR usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

ENV REACT_APP_MYENV=stg

RUN npm run build

CMD ["npm", "run", "start"]
