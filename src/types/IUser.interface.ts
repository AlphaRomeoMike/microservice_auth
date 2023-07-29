import { IBaseEntity } from "./IBaseEntity.interface";

export interface IUser extends IBaseEntity {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    description?: string;
}