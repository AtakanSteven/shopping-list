import { IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CodeDto {
  @ApiProperty({
    description: 'Phone number of the user.',
    examples: ['atakan.beddall@gmail.com'],
  })
  @IsDefined()
  username: string;

  @ApiProperty({
    description: 'Code that user will receive to their email.',
    example: '123456',
  })
  @IsDefined()
  code: string;
}
