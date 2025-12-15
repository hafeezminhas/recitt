import { Account } from '@database/entities/account.entity';
import { Billing } from '@database/entities/billing.entity';
import { Note } from '@database/entities/note.entity';
import { User } from '@database/entities/user.entity';
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
    entities: [User, Account, Billing, Note],
    synchronize: NODE_ENV !== 'production',
    logging: DB_LOG_SQL_QUERIES === 'true' ? ['query', 'error'] : false,
  }),
};
