FROM node:18

WORKDIR /usr/app

COPY .env .

COPY package.json .

RUN npm i -g yarn --force

COPY ./ .

RUN yarn install

RUN yarn build

RUN npx prisma migrate deploy

CMD ["yarn", "start"]

EXPOSE ${PORT}