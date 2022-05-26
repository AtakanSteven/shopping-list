import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Item, ItemDocument } from "./schema/item.schema";
import { CreateItemDto } from "./dto/create.item.dto";
import { ItemRepository } from "./item.repository";
import { ICreateItemInterfaceInput } from "./interface/create.item.input.interface";
import { ListService } from "../list/list.service";

@Injectable()
export class ItemService {
    constructor(
        @InjectModel(Item.name)
        private readonly itemModel: Model<ItemDocument>,
        private readonly ItemRepository: ItemRepository,
        private readonly ListService: ListService
    ) {}


    async createItem(profile, listId, createItemDto: CreateItemDto) {
        const { name, measurement, quantity } = createItemDto
        const itemId = new Types.ObjectId()
        const createItemInterfaceInput: ICreateItemInterfaceInput = {
            itemId,
            name,
            measurement,
            quantity
        }
        await this.ItemRepository.createItem(createItemInterfaceInput)
        await this.ListService.addItemToList(profile, listId, createItemInterfaceInput)
        return true;
    }


}
