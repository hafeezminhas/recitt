import { Account } from '@database/entities/account.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { AbstractRepository } from './abstract.repository';

@Injectable()
export class AccountRepository extends AbstractRepository<Account> {
  logger = new Logger(AccountRepository.name);
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>
  ) {
    super(accountRepo);
  }

  async findUser(
    filterQuery: FindOneOptions<Account>
  ): Promise<Account | null> {
    const account = this.findOne(filterQuery);

    if (!account) {
      this.logger.warn('Account not found', { filterQuery });
    }
    return account;
  }
}
