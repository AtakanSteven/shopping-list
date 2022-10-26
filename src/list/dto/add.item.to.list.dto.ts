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

  @ApiProperty({ example: '631f8f35d83fe9d23d13d6cd', required: true })
  @IsMongoId()
  listId: string;

  @ApiProperty({ example: '631f8f35d83fe9d23d13d6cd', required: true })
  @IsMongoId()
  itemId: string;

  @ApiProperty({ example: 'PIECE', required: true })
  @IsNotEmpty()
  @IsEnum(Measurement)
  measurement: Measurement;

  @ApiProperty({ example: '4', required: true })
  @IsNumber()
  quantity: number;
}
