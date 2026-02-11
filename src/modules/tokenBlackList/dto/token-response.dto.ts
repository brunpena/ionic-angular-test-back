import { ApiProperty } from '@nestjs/swagger';

export class TokenStatusDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  blacklisted: boolean;
}
