import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CodeDoc = Code & Document;

@Schema()
export class Code {

    @Prop({ required: true })
    code: string;

    @Prop({ required: true })
    name: string;

    @Prop({ type: Date, expires: 90 })
    createdAt: Date;
}

export const CodeSchema = SchemaFactory.createForClass(Code);
