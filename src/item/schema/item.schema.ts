 import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import {List} from "../../list/schema/list.schema";

export type ItemDocument = Item & Document;


@Schema({ timestamps: true })
export class Item {

    @Prop()
    name: string;

    @Prop()
    quantity: number;

    @Prop()
    measurement: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
