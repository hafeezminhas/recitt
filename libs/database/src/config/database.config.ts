import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig = registerAs(
  'database', // Key under which the config is registered
  (): TypeOrmModuleOptions => ({
    type: 'postgres', // Or 'mysql', 'sqlite', etc.
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    // Auto-load entities and synchronize (USE ONLY FOR DEV/POC!)
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: process.env.NODE_ENV !== 'production', // Use migrations in production
    logging: process.env.NODE_ENV !== 'production',
  }),
);
