import bcrypt from 'bcrypt'
import config from '../config'
import { badImplementation, badRequest } from '@hapi/boom'

const hashPassword = async (password: string) => {
  try {
    return await bcrypt.hash(password, +config.SALT_ROUNDS!)
  } catch (error: any) {
    throw badImplementation(error)
  }
}

const matchPassword = async (plainText: string, hashPassword: string) => {
  try {
    return await bcrypt.compare(plainText, hashPassword);
  } catch (error) {
    throw badRequest('\u2A2f Something went wrong during [comparision]')
  }
}

export { hashPassword, matchPassword }