import jwt from 'jsonwebtoken'
import { IUser } from '../types/IUser.interface'
import config from '../config'
import { badRequest } from '@hapi/boom'

const token = (user: IUser, secret: string) => {
  const { id, email } = user
  const token = jwt.sign({
    id, email
  }, secret, {
    expiresIn: config.SESSION_TIME
  })

  return token;
}

const verification = (token: string) => {
  try {
    const star = jwt.verify(token, config.JWT_SECRET!)
    return star
  } catch (error) {
    throw badRequest('Token is invalid')
  }
}

export {
  token,
  verification
}