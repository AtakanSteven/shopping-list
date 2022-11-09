import { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  userId: string;
  isProfileExist: boolean;
  email: string;
  username: string;
}
