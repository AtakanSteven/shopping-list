import { Types } from 'mongoose';

export interface ICreateItemInterfaceInput {
  itemId: Types.ObjectId;
  name: string;
}
