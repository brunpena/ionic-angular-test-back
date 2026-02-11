import { Global, Module } from '@nestjs/common';
import { TokenBlacklistService } from './token-black-list.service';
import { TokenBlacklistController } from './token-black-list.controller';
import { PrismaService } from 'prisma/prisma.service';

@Global()
@Module({
  controllers: [TokenBlacklistController],
  providers: [TokenBlacklistService, PrismaService],
  exports: [TokenBlacklistService],
})
export class TokenBlacklistModule {}
