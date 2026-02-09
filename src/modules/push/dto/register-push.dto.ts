import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum PushPlatform {
  web = 'web',
  android = 'android',
  ios = 'ios',
}

export class RegisterPushDto {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty({ enum: PushPlatform })
  @IsEnum(PushPlatform)
  platform: PushPlatform;
}
