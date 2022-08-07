import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateListDto {
  @ApiProperty({ example: 'atakan.beddall@gmail.com', required: true })
  @IsString()
  name: string;
}
