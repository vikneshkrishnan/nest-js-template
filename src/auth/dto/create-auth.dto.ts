import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    description: 'The name of the user',
    type: String,
    required: true,
    example: 'John Doe',
  })
  @IsString({
    message: 'Name must be a string',
  })
  name: string;

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

  @ApiProperty({
    description: 'The role of the user',
    type: String,
    required: true,
    example: 'admin',
  })
  @IsString({
    message: 'Role must be a string',
  })
  role: string;

  @ApiProperty({
    description: 'The phone of the user',
    type: String,
    required: true,
    example: '1234567890',
  })
  @IsString({
    message: 'Phone must be a string',
  })
  phone: string;
}
