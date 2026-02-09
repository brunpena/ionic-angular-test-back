import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { EventsModule } from './modules/events/events.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { PushModule } from './modules/push/push.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core/constants';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  providers: [
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },
],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        { ttl: 60, limit: 20 },  
        { ttl: 10, limit: 3 },
      ],
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    EventsModule,
    SubscriptionsModule,
    PushModule,
    JobsModule,
    PrismaModule,
  ],
})
export class AppModule {}
