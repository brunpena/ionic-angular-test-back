import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator'

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @MaxLength(120)
  name: string

  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  @MinLength(6)
  passwordHash: string

  @ApiProperty({
    example: 'São Paulo',
  })
  @IsString()
  city: string
}
