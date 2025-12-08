import { UserEntity } from '@database/entities/user.entity';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

const {
  NODE_ENV,
  DB_HOST,
  DB_PORT = '5432',
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_LOG_SQL_QUERIES,
} = process.env;

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  useFactory: () => ({
    type: 'postgres',
    host: DB_HOST,
    port: parseInt(DB_PORT, 10) || 5432,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [UserEntity],
    synchronize: NODE_ENV !== 'production',
    logging: DB_LOG_SQL_QUERIES === 'true' ? ['query', 'error'] : false,
  }),
};
