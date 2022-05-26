import { Types } from "mongoose";
import {Measurement} from "../dto/create.item.dto";


export interface ICreateItemInterfaceInput {
    itemId: Types.ObjectId,
    name: string,
    measurement: Measurement,
    quantity: number
}
