import { Types } from "mongoose";


export interface CreateListInterfaceInput {
    profile: Types.ObjectId,
    name: string,
    createdAt: Date
}

interface Item {
    _id: Types.ObjectId,
    name: string,
    quantity: number,
    createdAt: Date,
}
