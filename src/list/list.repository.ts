import { Model, Types } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List, ListDocument } from './schema/list.schema';
import { CreateListInterfaceInput } from './interface/create.list.interface';
import { AddItemToListInputInterface } from './interface/add.item.to.list.input.interface';

@Injectable()
export class ListRepository {
  constructor(
    @InjectModel(List.name)
    private readonly listModel: Model<ListDocument>,
  ) {}

  async createList(createListInput: CreateListInterfaceInput) {
    return new this.listModel(createListInput).save();
  }

  async addItemToList(profileId, listId, addItemToListInputInterface: AddItemToListInputInterface) {
    const { name, itemId, quantity, measurement } = addItemToListInputInterface;
    const match = { profile: profileId, list: listId };
    const update = { $push: { items: { _id: itemId, name, quantity, measurement, createdAt: new Date() }, $position: 0 } };
    return this.listModel.updateOne(match, update).lean().exec();
  }

  async isListExist(listId: string): Promise<boolean> {
    const match = { _id: listId };
    const list = await this.listModel.exists(match);
    return !!list;
  }

  async getListById(listId: string) {
    return await this.listModel.findById(listId, { owner: 1 }).lean().exec();
  }

  async getListsByProfile(profileId: Types.ObjectId) {
    return await this.listModel.find({ profile: profileId }).lean().exec();
  }
}
