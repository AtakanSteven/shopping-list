import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum Measurement {
  KG = 'KG',
  PIECE = 'PIECE',
}

export class AddItemToListDto {
  @ApiProperty({ example: 'potato', required: true })
  @IsString()
  name: string;

  @ApiProperty({ example: 'potato', required: true })
  @IsMongoId()
  listId: string;

  @ApiProperty({ example: 'PIECE', required: true })
  @IsNotEmpty()
  @IsEnum(Measurement)
  measurement: Measurement;

  @ApiProperty({ example: '4', required: true })
  @IsNumber()
  quantity: number;
}
