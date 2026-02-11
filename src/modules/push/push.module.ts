import { Module } from '@nestjs/common';
import { PushController } from './push.controller';
import { PushService } from './push.service';
import { TokenBlacklistModule } from '../tokenBlackList/token-black-list.module';


@Module({
  imports: [TokenBlacklistModule,],
  controllers: [PushController],
  providers: [PushService],
  exports: [PushService],
})
export class PushModule {}
