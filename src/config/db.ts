import { PrismaClient } from "@prisma/client";
import config from "./index";
import { set } from "lodash";

console.log(`\u2713 Primsa DB URL is ${config.DATABASE_URL}`)
const client = new PrismaClient({
  log: ['query', 'info'], datasources: {
    db: {
      url: config.DATABASE_URL
    }
  }
})

client.$use(async (params, next) => {
  if (params.model == 'User') {
    if (params.action == 'delete') {
      set(params, 'action', 'update')
      params.args['data'] = { deletedAt: new Date() }
      params.args['data'] = { updatedAt: new Date() }
    }
    if (params.action == 'update') {
      params.args['data'] = { updatedAt: new Date() }
    }
  }

  return next(params);
})

export { client }