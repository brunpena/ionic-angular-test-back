import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

export const createNestServer = async () => {
  const server = express();

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
    { bufferLogs: true }
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.init();
  return server;
};
