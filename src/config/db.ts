import { PrismaClient } from "@prisma/client";
import config from "./index";

console.log(`\u2713 Primsa DB URL is ${config.DATABASE_URL}`)
const client = new PrismaClient({
  log: ['query', 'info'], datasources: {
    db: {
      url: config.DATABASE_URL
    }
  }
})

export { client }