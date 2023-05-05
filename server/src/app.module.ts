import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users';
import { LoggerModule } from 'nestjs-pino';
import { FilesModule } from './files';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { typeOrmConfig } from './config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../.env' }),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options:
            process.env.NODE_ENV !== 'development'
              ? {
                  singleLine: true,
                  colorize: true,
                  translateTime: 'UTC:mm/dd/yyyy, hh:MM:ss TT Z',
                  levelFirst: true,
                }
              : {},
        },
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    UsersModule,
    FilesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
