import { ObjectId } from "bson";

export interface IBaseEntity {
    id?: ObjectId;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}