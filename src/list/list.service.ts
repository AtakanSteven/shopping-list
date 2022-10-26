import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create.list.dto';
import { CreateListInterfaceInput } from './interface/create.list.interface';
import { ListRepository } from './list.repository';
import { AddItemToListInputInterface } from './interface/add.item.to.list.input.interface';
import { AddItemToListDto } from './dto/add.item.to.list.dto';

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

  async addItemToList(user, addItemToListDto: AddItemToListDto) {
    const { name, itemId, quantity, measurement, listId } = addItemToListDto;

    const addItemToListInputInterface: AddItemToListInputInterface = {
      name,
      itemId,
      quantity,
      measurement,
    };
    return this.listRepository.addItemToList(user, listId, addItemToListInputInterface);
  }

  async isListExist(listId: string): Promise<boolean> {
    return await this.listRepository.isListExist(listId);
  }

  async getListById(listId: string) {
    return await this.listRepository.getListById(listId);
  }
}
