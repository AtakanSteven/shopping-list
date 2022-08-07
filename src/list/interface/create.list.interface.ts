import { Types } from 'mongoose';

export interface CreateListInterfaceInput {
  profile: Types.ObjectId;
  owner: Types.ObjectId;
  name: string;
}

interface Item {
  _id: Types.ObjectId;
  name: string;
  quantity: number;
  createdAt: Date;
}
