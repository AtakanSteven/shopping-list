import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create.list.dto';
import { CreateListInterfaceInput } from './interface/create.list.interface';
import { ListRepository } from './list.repository';
import { UpdateListItemInputInterface } from './interface/update.list.input.interface';
import { IAddItemToListInputInterface } from '../item/interface/add.item.to.list.input.interface';

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}

  async create(profile, createListDto: CreateListDto) {
    const { name } = createListDto;
    const createListInput: CreateListInterfaceInput = {
      owner: profile,
      profile,
      name,
    };
    return await this.listRepository.createList(createListInput);
  }

  async addItemToList(user, addItemToListInputInterface: IAddItemToListInputInterface) {
    const { name, itemId, quantity, measurement, listId } = addItemToListInputInterface;

    const updateListItemInputInterface: UpdateListItemInputInterface = {
      name,
      itemId,
      quantity,
      measurement,
    };
    return this.listRepository.updateListItem(user, listId, updateListItemInputInterface);
  }

  async isListExist(listId: string): Promise<boolean> {
    return await this.listRepository.isListExist(listId);
  }

  async getListById(listId: string) {
    return await this.listRepository.getListById(listId);
  }
}
