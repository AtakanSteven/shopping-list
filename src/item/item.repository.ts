import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from './schema/item.schema';
import { ICreateItemInterfaceInput } from './interface/create.item.input.interface';

@Injectable()
export class ItemRepository {
  constructor(
    @InjectModel(Item.name)
    private readonly itemModel: Model<ItemDocument>,
  ) {}

  async createItem(createItemInput: ICreateItemInterfaceInput) {
    const { itemId, name } = createItemInput;
    const itemExist = await this.isItemExist(name);
    if (!itemExist) {
      return await new this.itemModel({
        _id: itemId,
        name,
      }).save();
    }
    return name;
  }

  private async isItemExist(itemName: string): Promise<boolean> {
    const match = { name: itemName };
    const list = await this.itemModel.exists(match);
    return !!list;
  }
}
