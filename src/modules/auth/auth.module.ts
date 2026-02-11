import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UsersModule } from 'src/modules/users/users.module';
import { TokenBlacklistModule } from '../tokenBlackList/token-black-list.module';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { JwtStrategy } from './guards/jwt-strategy';

@Module({
  imports: [
    UsersModule,
    TokenBlacklistModule,
    ConfigModule,

    // ⭐ REGISTRA PASSPORT
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    // ⭐ REGISTRA JWT
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET')!,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    JwtStrategy, // ⭐ ESSENCIAL
  ],

  exports: [
    AuthService,
    PassportModule, // ⭐ permite usar guard em outros módulos
    JwtModule,
  ],
})
export class AuthModule {}
