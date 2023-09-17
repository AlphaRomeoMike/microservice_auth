import { NextFunction, Request, Response } from "express";
import LogHandler from "../handlers/log.handler";

async function Logger(_request: Request, _response: Response, _next: NextFunction) {
  const object = {
    method: _request.method,
    body: _request.body,
    headers: _request.headers,
    params: _request.params,
    query: _request.query,
    url: _request.url
  };

  LogHandler(JSON.stringify(object));
  _next();
}

export default Logger

