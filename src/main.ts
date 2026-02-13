import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 BODY LIMIT (antes de tudo)
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  // 🔐 Segurança básica
  app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }));

  // ✅ Validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // 🌍 CORS
  app.enableCors({
    origin: [
      'http://localhost:8100',
      'http://localhost:4200',
      'https://ionic-angular-test-3b828.firebaseapp.com',
      'https://ionic-angular-test-3b828.web.app',
    ],
    credentials: true,
  });

  // 📚 Swagger
  const config = new DocumentBuilder()
    .setTitle('FeirApp API')
    .setDescription('Documentação da API do teste técnico')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // 🚀 Start
  const port = parseInt(process.env.PORT || '3000', 10);
  await app.listen(port);

  console.log(`🔥 Server running`);
  console.log(`👉 http://localhost:${port}`);
  console.log(`👉 http://localhost:${port}/docs`);
}

bootstrap();
