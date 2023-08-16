FROM node:18

WORKDIR /usr/app

COPY .env .

COPY package.json .

RUN npm i -g yarn --force

COPY ./ .

RUN yarn install

RUN yarn build

RUN npx prisma migrate dev --name "Initial Migration"

CMD ["yarn", "start"]

EXPOSE ${PORT}