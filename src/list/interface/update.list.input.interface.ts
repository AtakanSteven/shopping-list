import { Types } from 'mongoose';

export interface UpdateListItemInputInterface {
  name: string;
  itemId: Types.ObjectId;
  quantity: number;
  measurement: string;
}
