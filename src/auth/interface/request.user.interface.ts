import { Types } from 'mongoose';

export interface IUserRequest {
  _id: Types.ObjectId;
  username: string;
  name: string;
  surname: string;
  car: ICar;
  bio: string;
  coverPhoto: string;
  userId: string;
  licensePlate: string;
  gender: string;
  profilePhoto: string;
  isDeleted: boolean;
  isPrivate: boolean;
  phone: string;
  isProfileExist: boolean;
  verification: boolean;
  postImages: IPostImages;
}

interface ICar {
  brand?: string;
  model?: string;
  year?: string;
}

interface IPostImages {
  _id?: Types.ObjectId;
  url?: string;
}
