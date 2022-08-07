import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ example: 'AtakanSteven', required: true })
  @MaxLength(16, { message: 'username must have maximum 16 characters' })
  @MinLength(4, { message: 'username must have minimum 4 characters' })
  username: string;
}
