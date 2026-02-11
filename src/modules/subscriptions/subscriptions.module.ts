import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { TokenBlacklistModule } from 'src/modules/tokenBlackList/token-black-list.module';


@Module({
  imports: [TokenBlacklistModule,],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
})
export class SubscriptionsModule {}
