import { Measurement } from '../../list/dto/add.item.to.list.dto';

export interface IAddItemToListInputInterface {
  itemId: string;
  name: string;
  quantity: number;
  measurement: Measurement;
  listId: string;
}
