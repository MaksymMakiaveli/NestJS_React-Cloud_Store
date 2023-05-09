import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  Logger as NestLogger,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';
import { JwtRequestType } from './common/constants';
import { GlobalExceptionFilter } from './common/filters';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: false,
    bufferLogs: true,
  });

  app.enableCors({ credentials: true, origin: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            field: error.property,
            errors: [...Object.values(error.constraints)],
          })),
        );
      },
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  // --------------- swagger
  const swagger = new DocumentBuilder()
    .setTitle('Cloud Storage API')
    .setDescription('This service was build using NestJS')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      JwtRequestType.auth,
    )
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api/swagger', app, document);
  // ---------------  config
  const config = await app.get(ConfigService);
  const port = config.get<number>('API_PORT');

  await app.listen(port || 3000, () => {
    NestLogger.log(`App listening on port ${port}`, 'bootstrap');
  });
}

bootstrap();
