import { Boom, badRequest } from "@hapi/boom";
import { client } from "../config/db";
import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "joi";
import { get, isNil, set, unset } from "lodash";

function errorMiddleware(
  error: Error | Boom | ValidationError
    | PrismaClientInitializationError
    | PrismaClientKnownRequestError
    | PrismaClientValidationError
    | PrismaClientUnknownRequestError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof Boom) {
    const _code = get(error, 'output.statusCode', 500)
    const _payload = Object.assign(error.output.payload, { data: error.data }, { message: error.message });

    set(_payload, 'code', _code);
    unset(_payload, 'statusCode');

    isNil(_payload.data) ?? unset(_payload, 'data');

    response.status(_code).json(_payload)
  }

  if (error instanceof ValidationError) {
    error = badRequest(error.message, error.details)
    response.send(error)
  }

  if (error instanceof PrismaClientInitializationError
    || error instanceof PrismaClientKnownRequestError
    || error instanceof PrismaClientKnownRequestError
    || error instanceof PrismaClientUnknownRequestError
    || error instanceof PrismaClientValidationError) {
      client.$disconnect().then(() => { console.warn(`Prisma disconnected`) })
      response.send(error).status(500)
  }
  next();
}
export default errorMiddleware;
