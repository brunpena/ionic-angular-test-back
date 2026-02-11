import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PushService } from './push.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';

class RegisterPushDto {
  token: string;
  platform: 'web' | 'android' | 'ios';
}

@UseGuards(JwtAuthGuard)
@ApiTags('Push')
@ApiBearerAuth()
@Controller('push')
export class PushController {
  constructor(private push: PushService) {}

  @UseGuards(JwtAuthGuard)
  @Post('register')
  @ApiOperation({ summary: 'Register device push token' })
  register(
    @Req() req,
    @Body() dto: RegisterPushDto,
  ) {
    return this.push.registerToken(
      req.user.id,
      dto.token,
      dto.platform,
    );
  }
}
