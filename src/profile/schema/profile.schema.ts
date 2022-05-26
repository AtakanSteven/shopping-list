import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document, Types} from "mongoose";

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile {

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    username: string;

}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
