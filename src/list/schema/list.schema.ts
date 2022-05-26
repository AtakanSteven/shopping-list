import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type ListDocument = List & Document;


@Schema({ timestamps: true })
export class List {

    @Prop()
    name: string;

    @Prop({ type: [Types.ObjectId], ref: "Profile" })
    profile: [Types.ObjectId];

    @Prop({
        default(): any {
            return [];
        },
    })
    item: [];
}

export const ListSchema = SchemaFactory.createForClass(List);
