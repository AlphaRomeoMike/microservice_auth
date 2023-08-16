# User Authentication Service


## Setup


This API is based on the following technologies:
  - Node v18
  - Prisma with PGSQL
  - TypeScript
---
To setup this API, run the following commands in sequence:

`cp .env.example .env`


In a terminal, verify Node v18 is install by running the command `node -v`


If the terminal shows you something like `v18.16.0`, you are good to go

Run a command to generate a sercure hash using Node's built in [Crypto]() library as JWT secret by running the following command

`console.log(crypto.randomBytes(64).toString('hex'))`

Set the desired SALT rounds value that your machine/server can handle, ideally it should be 12

Set desired token expiration time, I prefer principle of least previlige and hence consider 1 hour to be a suitable enough time, so I use it as '1h'

Set desired port that you want your service to run on.

