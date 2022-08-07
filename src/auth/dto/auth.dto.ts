import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: 'email of the user.',
    examples: ['atakan.beddall@gmail.com'],
  })
  @IsDefined()
  username: string;
}
