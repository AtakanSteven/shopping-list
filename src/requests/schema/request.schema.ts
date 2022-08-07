import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RequestDocument = Request & Document;

@Schema({ timestamps: true })
export class Request {
  @Prop({ type: Types.ObjectId, ref: 'List' })
  listId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Profile' })
  sender: Types.ObjectId;

  @Prop()
  status: string;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
