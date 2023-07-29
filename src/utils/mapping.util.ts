import { isNull} from 'lodash'
import { IUser } from '../types/IUser.interface'

const mapper = (object: any) => {
  if (!isNull(object.email)) {
    const user: IUser = {
      fullName: object.fullName,
      email: object.email, 
      phoneNumber: object.phoneNumber,
      password: object.password,
      id: object.id,
      description: object.description,
      createdAt: object.createdAt,
      updatedAt: object.updatedAt,
      deletedAt: object.deletedAt,
    }

    return user;
  }
}

export {
  mapper
}