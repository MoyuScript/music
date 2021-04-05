FROM node:14.16-alpine

WORKDIR /app

COPY ./package.json .

RUN npm install --registry=https://registry.npm.taobao.org

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
