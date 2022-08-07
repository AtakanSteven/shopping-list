import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema({ timestamps: true })
export class Item {
  @Prop()
  name: string;

  @Prop()
  icon: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
