import { ApiProperty } from "@nestjs/swagger";
import {IsEnum, IsNumber, IsString} from "class-validator";
import {Types} from "mongoose";
import {Measurement} from "../../item/dto/create.item.dto";


export class UpdateListItemDto {

    @ApiProperty({ example: "potato", required: true })
    @IsString()
    name: string;

    @ApiProperty({ example: "KG", required: true })
    @IsEnum(Measurement)
    measurement: Measurement;

    @ApiProperty({ example: "4", required: true })
    @IsNumber()
    quantity: number;
}
