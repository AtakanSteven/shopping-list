import { Model, Types } from "mongoose";

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"
import { List, ListDocument} from "./schema/list.schema";
import { CreateListInterfaceInput } from "./interface/create.list.interface";
import {UpdateListItemInputInterface} from "./interface/update.list.input.interface";

@Injectable()
export class ListRepository {
    constructor(
        @InjectModel(List.name)
        private readonly listModel: Model<ListDocument>,
    ) {}

    async createList(createListInput: CreateListInterfaceInput) {
        return new this.listModel(createListInput).save();
    }
    async updateListItem(profile, listId, updateListItemInputInterface: UpdateListItemInputInterface) {
        const { name, quantity, measurement, itemId } = updateListItemInputInterface
        const match = { profile, list: listId }
        const update = { $push: { item: { _id: itemId, name, quantity, measurement, createdAt: new Date() }, $position: 0  } };
        return this.listModel.updateOne(match, update)
    }
}
