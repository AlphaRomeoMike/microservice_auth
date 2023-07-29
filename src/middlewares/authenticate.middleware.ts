import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { isNull } from "lodash";
import config from "../config";
import { badData } from "@hapi/boom";

const confirmAuthenticated = async (_request: Request, _response: Response, next: NextFunction) => {
  const token = _request.body['token'] || _request.query['token'] || _request.headers['authorization']

  if (isNull(token)) {
    _response.send(403).send('User unauthorized!')
    console.log(`\u27A7 Token not found in the request`)
  }

  try {
    console.log(`\u2713 The provided token is ${token}`)

    const decodedUser = jwt.verify(token, config.JWT_SECRET!)
    console.log(`\u2713 ${JSON.stringify(decodedUser)}`);
    
    // _request['user'] = decodedUser
  } catch (error) {
    throw badData(`Invalid authentication token`)
  }

  return next();
}

export default confirmAuthenticated