import { NotFoundException, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ItemRepository } from './item.repository';
import { ICreateItemInterfaceInput } from './interface/create.item.input.interface';
import { ListService } from '../list/list.service';
import { IAddItemToListInputInterface } from './interface/add.item.to.list.input.interface';
import { AddItemToListDto } from './dto/add.item.to.list.dto';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository, private readonly listService: ListService) {}

  async createItem(profileId: Types.ObjectId, listId, addItemDto: AddItemToListDto) {
    const { name } = addItemDto;
    const listExist = await this.listService.isListExist(listId);
    if (listExist) {
      const itemId = new Types.ObjectId();
      const createItemInputInterface: ICreateItemInterfaceInput = {
        itemId,
        name,
      };
      await this.itemRepository.createItem(createItemInputInterface);
      return await this.addItemToList(profileId, itemId, listId, addItemDto);
    }
    throw new NotFoundException('NO_SUCH_LIST');
  }

  private async addItemToList(profileId: Types.ObjectId, itemId, listId, addItemDto: AddItemToListDto) {
    const { name, measurement, quantity } = addItemDto;
    const addItemToListInputInterface: IAddItemToListInputInterface = {
      itemId,
      name,
      quantity,
      measurement,
      listId,
    };
    return await this.listService.addItemToList(profileId, addItemToListInputInterface);
  }
}
