import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: configService.get('TYPEORM_CONNECTION') as 'postgres',
  host: configService.get('TYPEORM_HOST'),
  port: parseInt(configService.get('TYPEORM_PORT')),
  username: configService.get('TYPEORM_USERNAME'),
  password: configService.get('TYPEORM_PASSWORD'),
  database: configService.get<string>('TYPEORM_DATABASE'),
  synchronize: false,
  logging: false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
});
