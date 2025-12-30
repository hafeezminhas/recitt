import { Account } from '@database/entities/account.entity';

declare module 'express' {
  export interface Request {
    account?: Account;
    accountId?: string;
  }
}
