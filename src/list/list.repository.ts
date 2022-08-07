import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List, ListDocument } from './schema/list.schema';
import { CreateListInterfaceInput } from './interface/create.list.interface';
import { UpdateListItemInputInterface } from './interface/update.list.input.interface';

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
    const { name, itemId, quantity, measurement } = updateListItemInputInterface;
    const match = { profile: profile._id, list: listId };
    const update = { $push: { items: { _id: itemId, name, quantity, measurement, createdAt: new Date() }, $position: 0 } };
    return this.listModel.updateOne(match, update);
  }

  async isListExist(listId: string): Promise<boolean> {
    const match = { _id: listId };
    const list = await this.listModel.exists(match);
    return !!list;
  }

  async getListById(listId: string) {
    const projection = { owner: 1 };
    return await this.listModel.findById(listId, projection).lean().exec();
  }
}
