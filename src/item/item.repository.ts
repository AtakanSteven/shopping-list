import { Model } from "mongoose";

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"
import { Item, ItemDocument } from "./schema/item.schema";
import { ICreateItemInterfaceInput } from "./interface/create.item.input.interface";


@Injectable()
export class ItemRepository {
    constructor(
        @InjectModel(Item.name)
        private readonly itemModel: Model<ItemDocument>,
    ) {}

    async createItem(createItemInput: ICreateItemInterfaceInput) {
        const { itemId, name, measurement, quantity } = createItemInput;
        return await new this.itemModel({
            _id: itemId,
            name,
            quantity,
            measurement,
        }).save();
    }
}
