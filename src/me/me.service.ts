import { Injectable } from '@nestjs/common';
import { ListService } from '../list/list.service';
import { Types } from 'mongoose';

@Injectable()
export class MeService {
  constructor(private readonly listService: ListService) {}

  async getMyLists(profileId: Types.ObjectId) {
    return await this.listService.getListsByProfile(profileId);
  }
}
