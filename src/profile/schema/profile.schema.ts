import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {
  @Prop()
  email: string;

  @Prop()
  username: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
