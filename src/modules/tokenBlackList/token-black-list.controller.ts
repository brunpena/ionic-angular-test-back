import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

import { TokenBlacklistService } from './token-black-list.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { TokenStatusDto } from './dto/token-response.dto';

@ApiTags('Token Blacklist')
@Controller('token-blacklist')
export class TokenBlacklistController {
  constructor(private readonly service: TokenBlacklistService) {}

  // ===============================
  // ADD TOKEN
  // ===============================
  @Post()
  @ApiOperation({ summary: 'Adicionar token à blacklist' })
  @ApiResponse({ status: 201 })
  async add(@Body() dto: CreateTokenDto) {
    return this.service.add(dto.token, new Date(dto.expiresAt));
  }

  // ===============================
  // CHECK TOKEN
  // ===============================
  @Get(':token')
  @ApiOperation({ summary: 'Verificar se token está blacklistado' })
  @ApiParam({ name: 'token' })
  @ApiResponse({
    status: 200,
    type: TokenStatusDto,
  })
  async check(@Param('token') token: string): Promise<TokenStatusDto> {
    const blacklisted = await this.service.isBlacklisted(token);
    return { token, blacklisted };
  }

  // ===============================
  // REMOVE TOKEN
  // ===============================
  @Delete(':token')
  @ApiOperation({ summary: 'Remover token da blacklist' })
  async remove(@Param('token') token: string) {
    return this.service.remove(token);
  }

  // ===============================
  // LIST
  // ===============================
  @Get()
  @ApiOperation({ summary: 'Listar tokens blacklistados' })
  async list() {
    return this.service.listAll();
  }

  // ===============================
  // CLEAR EXPIRED
  // ===============================
  @Delete('clear/expired')
  @ApiOperation({ summary: 'Limpar tokens expirados' })
  async clearExpired() {
    return this.service.clearExpired();
  }
}
