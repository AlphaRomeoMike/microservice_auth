import { notFound, serverUnavailable } from "@hapi/boom";
import { client } from "../config/db";
import { IUser } from "../types/IUser.interface";
import { hashPassword, matchPassword } from '../utils/hashing.util'
import { isNull, set } from 'lodash';
import { removeAttrFromObject } from "../utils/sanitize.util";
import { token, verification } from "../utils/signing.utils";
import config from "../config";
import { mapper } from "../utils/mapping.util";


function UserService() {
  /**
   * # Create a user
   * ---
   * @name createUser
   * @description Create a user in the database
   * @param {IUser} user
   * @returns {IUser} dbUser
   */
  const createUser = async (user: IUser) => {
    // hash the password
    const password = await hashPassword(user.password)

    //set current user object password to hashedPassword value
    set(user, 'password', password)

    //create the user
    const dbUser = await client.user.create({
      data: {
        email: user.email,
        password: user.password,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        description: user.description,
        createdAt: new Date(),
      },
    });

    removeAttrFromObject(dbUser, 'password')

    if (!dbUser) {
      throw serverUnavailable(dbUser);
    }
    return dbUser;
  };

  /**
   * # Find user by email address
   * ---
   * @name findUserById
   * @param {String} email
   * @returns res 
   */
  const findUserById = async (email: string) => {
    const dbUser = await client.user.findFirst({
      where: {
        AND: [
          { email: email },
          { deletedAt: undefined }
        ]
      }
    });

    if (!dbUser) {
      return notFound('User not found!')
    }
    return dbUser;
  };

  /**
   * # Login
   * ---
   * @name login
   * @description handles logic for logging in a user
   * @param {String} email 
   * @param {String} password 
   * @returns {Object<Omit<IUser, "password">, token>} response
   */
  const login = async (email: string, password: string) => {
    // get user info from DB
    const user = await findUserById(email);


    // map the information
    const mappedUser = mapper(user)!

    // compare passwords
    const passwordComparision = await matchPassword(password, mappedUser.password)

    if (!passwordComparision) {
      throw notFound('User not found with given credentials')
    }

    // sanitize the password field
    const santizedUser = removeAttrFromObject(mappedUser, 'password')

    // generate the token
    const tokenStr = token(mappedUser, config.JWT_SECRET!)

    set(santizedUser, 'token', tokenStr)

    return santizedUser;
  };

  const verifyToken = (token: string) => {
    const user = verification(token);
    return user;
  }

  return {
    createUser,
    login,
    verifyToken
  };
}

export default UserService;
