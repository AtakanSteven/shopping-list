import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create.list.dto';
import { CreateListInterfaceInput } from './interface/create.list.interface';
import { ListRepository } from './list.repository';
import { AddItemToListInputInterface } from './interface/add.item.to.list.input.interface';
import { AddItemToListDto } from './dto/add.item.to.list.dto';
import { Types } from 'mongoose';

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

  async addItemToList(profileId, addItemToListDto: AddItemToListDto) {
    const { name, itemId, quantity, measurement, listId } = addItemToListDto;

    const addItemToListInputInterface: AddItemToListInputInterface = {
      name,
      itemId,
      quantity,
      measurement,
    };
    return this.listRepository.addItemToList(profileId, listId, addItemToListInputInterface);
  }

  async isListExist(listId: string): Promise<boolean> {
    return await this.listRepository.isListExist(listId);
  }

  async getListsByProfile(profileId: Types.ObjectId) {
    return await this.listRepository.getListsByProfile(profileId);
  }

  async getListById(listId: string) {
    return await this.listRepository.getListById(listId);
  }

  // todo delete item from lists, get my lists,
}
