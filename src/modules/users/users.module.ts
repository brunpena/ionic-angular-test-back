import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TokenBlacklistModule } from 'src/modules/tokenBlackList/token-black-list.module';


@Module({
  imports: [TokenBlacklistModule,],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
