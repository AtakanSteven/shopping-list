import { Model, Types } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RequestDocument, Request } from './schema/request.schema';
import { RequestEnum } from '../helper/enums/request.enum';

@Injectable()
export class RequestRepository {
  constructor(
    @InjectModel(Request.name)
    private readonly requestModel: Model<RequestDocument>,
  ) {}

  async joinListRequest(profileId: Types.ObjectId, listId: string) {
    return new this.requestModel({
      sender: profileId,
      listId,
      status: RequestEnum.PENDING,
    }).save();
  }

  async isRequestExist(profileId: Types.ObjectId, listId: string) {
    const match = {
      sender: profileId,
      listId,
    };
    const exists = await this.requestModel.exists(match).exec();
    return !!exists;
  }
}
