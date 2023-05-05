import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: false,
    bufferLogs: true,
  });

  app.enableCors({ credentials: true, origin: true });
  app.useLogger(app.get(Logger));
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  // --------------- swagger
  const swagger = new DocumentBuilder()
    .setTitle('Cloud Storage API')
    .setDescription('This service was build using NestJS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api/swagger', app, document);
  // Logger.log('Swagger is ready', 'bootstrap');
  // ---------------  config
  const config = await app.get(ConfigService);
  const port = config.get<number>('API_PORT');
  // Logger.log('Config is ready', 'bootstrap');

  await app.listen(port || 3000, () => {
    // Logger.log(`App listening on port ${port}`, 'bootstrap');
  });
}

bootstrap();
