import { Boom } from "@hapi/boom";
import { Request, Response, NextFunction } from "express";

function errorMiddleware(
  error: Error | Boom,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (!(error instanceof Boom)) {
    throw new Boom(error.message);
  }
  response.status(error.output.statusCode).json(error.output.payload);
}

export default errorMiddleware;
