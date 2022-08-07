import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CodeDoc = Code & Document;

/**
 * Code schema stores the codes that is sent to the users' phone.
 */
@Schema()
export class Code {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  username: string;

  /**
   * Time that code sent to the user.
   *
   * Note: It will be expired after 90 seconds.
   */
  @Prop({ type: Date, expires: 90 })
  createdAt: Date;
}

export const CodeSchema = SchemaFactory.createForClass(Code);
