import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Measurement } from '../../list/dto/update.list.item.dto';

export class CreateItemDto {
  @ApiProperty({ example: 'potato', required: true })
  @IsString()
  name: string;

  @ApiProperty({ example: '1', required: true })
  @IsString()
  quantity: number;

  @ApiProperty({ example: 'KG', required: true })
  @IsString()
  measurement: Measurement;
}
