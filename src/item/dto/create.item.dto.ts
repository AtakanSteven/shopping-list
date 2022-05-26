import { ApiProperty } from "@nestjs/swagger";
import {IsEnum, IsNotEmpty, IsNumber, IsString} from "class-validator";

export enum Measurement {
    KG = "KG",
    PIECE = "PIECE",
}

export class CreateItemDto {
    @ApiProperty({ example: "potato", required: true })
    @IsString()
    name: string;

    @ApiProperty({ example: "PIECE", required: true })
    @IsNotEmpty()
    @IsEnum(Measurement)
    measurement: Measurement;

    @ApiProperty({ example: "4", required: true })
    @IsNumber()
    quantity: number;
}
