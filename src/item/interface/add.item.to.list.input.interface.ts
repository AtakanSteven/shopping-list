import { Types } from 'mongoose';
import { Measurement } from '../../list/dto/update.list.item.dto';

export interface IAddItemToListInputInterface {
  itemId: Types.ObjectId;
  name: string;
  quantity: number;
  measurement: Measurement;
  listId: string;
}
