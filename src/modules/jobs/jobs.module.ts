import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { PushModule } from '../push/push.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    PushModule, // ⭐ AQUI
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
