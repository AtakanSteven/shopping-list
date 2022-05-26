import {Types} from "mongoose";
import {Measurement} from "../../item/dto/create.item.dto";


export interface UpdateListItemInputInterface {
    itemId: Types.ObjectId,
    name: string,
    quantity: number,
    measurement: Measurement,
}
