FROM node:18

WORKDIR /usr/app

COPY .env .

COPY package.json .

RUN npm i -g yarn --force

COPY ./ .

RUN yarn install

EXPOSE ${PORT}

RUN npx prisma generate

RUN yarn build

CMD ["yarn", "start"]