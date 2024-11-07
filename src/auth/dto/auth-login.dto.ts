import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({
    description: 'The email of the user',
    type: String,
    required: true,
    example: 'johndeo@email.com',
  })
  @IsString({
    message: 'Email must be a string',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    type: String,
    required: true,
    example: 'password',
  })
  @IsString({
    message: 'Password must be a string',
  })
  password: string;
}
