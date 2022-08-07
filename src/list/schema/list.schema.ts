import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ListDocument = List & Document;

@Schema({ timestamps: true })
export class List {
  @Prop({ type: [Types.ObjectId], ref: 'Profile' })
  profile: [Types.ObjectId];

  @Prop({ type: Types.ObjectId, ref: 'Profile' })
  owner: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  quantity: number;

  @Prop()
  measurement: string;

  @Prop({
    default(): any {
      return [];
    },
  })
  items: [];
}

export const ListSchema = SchemaFactory.createForClass(List);
