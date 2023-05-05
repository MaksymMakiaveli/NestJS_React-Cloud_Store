// import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: parseInt(process.env.TYPEORM_PORT) || 5432,
  username: process.env.TYPEORM_USERNAME || 'cloud_store_makiaveli',
  password:
    process.env.TYPEORM_PASSWORD || 'e08b2fe1-462c-498c-baf0-15081c0bee9b',
  database: process.env.TYPEORM_DATABASE || 'cloud_store',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
});
