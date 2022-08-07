import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RequestDocument, Request } from './schema/request.schema';
import { IUserRequest } from '../auth/interface/request.user.interface';
import { RequestEnum } from '../helper/enums/request.enum';

@Injectable()
export class RequestRepository {
  constructor(
    @InjectModel(Request.name)
    private readonly requestModel: Model<RequestDocument>,
  ) {}

  async joinListRequest(profile: IUserRequest, listId: string) {
    return new this.requestModel({
      sender: profile._id,
      listId,
      status: RequestEnum.PENDING,
    }).save();
  }

  async isRequestExist(profile: IUserRequest, listId: string) {
    const match = {
      sender: profile._id,
      listId,
    };
    const exists = await this.requestModel.exists(match).exec();
    return !!exists;
  }
}
