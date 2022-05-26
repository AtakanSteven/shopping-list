import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {Model, Types} from "mongoose";
import { List, ListDocument } from "./schema/list.schema";
import {CreateListDto} from "./dto/create.list.dto";
import {CreateListInterfaceInput} from "./interface/create.list.interface";
import {ListRepository} from "./list.repository";
import {UpdateListItemDto} from "./dto/update.list.item.dto";
import {UpdateListItemInputInterface} from "./interface/update.list.input.interface";

@Injectable()
export class ListService {
    constructor(
        private readonly ListRepository: ListRepository
    ) {}

    async create(profile, createListDto: CreateListDto) {
        const { name } = createListDto;
        const createListInput: CreateListInterfaceInput = {
            profile,
            name,
            createdAt: new Date(Date.now()),
        }
        await this.ListRepository.createList(createListInput)
    }

    async addItemToList(profile, listId, updateListItemDto: UpdateListItemDto) {
        const { name, measurement, quantity } = updateListItemDto
        const itemId = new Types.ObjectId()
        const updateListItemInputInterface: UpdateListItemInputInterface = {
            itemId,
            name,
            measurement,
            quantity
        }
        console.log("itemIdlistservice1", itemId)
        return this.ListRepository.updateListItem(profile, listId, updateListItemInputInterface)
    }

}
