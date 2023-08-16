import { NextFunction, Request, Response } from "express";
import { IUser } from "../types/IUser.interface";
import { schemas } from "../schema/index";
import { badRequest } from "@hapi/boom";
import UserService from "../services/user.service";
import { isNull } from "lodash";

function UserController() {
  // Get instance of user service
  const svc = UserService()

  /**
   * # Create a user
   * ---
   * @name create
   * @description Hashes a user password, then store in the db
   * @param {Request} request 
   * @param {Response} response 
   * @param {NextFunction} next 
   * @returns {Response} response
   */
  const create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user: IUser = request.body;
      console.log(`\u2A2f The current [user] object is `, user);
      const validation = schemas.users.create.validate(user);
      let res = await svc.createUser(user)
      response.status(201).json({ message: "User created", data: res, statusCode: response.statusCode });

    } catch (error) {
      throw error
    }
  };

  /**
   * # Login
   * ---
   * @name login
   * @description retrieves user info from DB and logs in the user
   * @param {Request} requset 
   * @param {Response} response 
   * @param {NextFunction} next 
   * @returns {Response} response
   */
  const login = async (requset: Request, response: Response, next: NextFunction) => {
    const { email, password } = requset.body
    const user = await svc.login(email, password);

    console.log(`\u27A7 ${JSON.stringify(user)}`,);

    if (isNull(user)) {
      throw badRequest('Invalid parameters for authentication')
    }
    response.status(200).json({ message: 'Logged in', data: user, statusCode: response.statusCode })
  }

  const verifyToken = async (request: Request, response: Response) => {
    const token = request.headers['authorization']?.toString()
    if (!token) {
      throw badRequest('Unauthorized')
    }
    return svc.verifyToken(token);
  };

  return {
    create,
    login,
    verifyToken
  };
}

export default UserController;
