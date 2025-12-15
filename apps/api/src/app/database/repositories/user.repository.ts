import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { AbstractRepository } from './abstract.repository';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  logger = new Logger(UserRepository.name);
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>
  ) {
    super(usersRepo);
  }

  async findUser(filterQuery: FindOneOptions<User>): Promise<User | null> {
    const user = this.findOne(filterQuery);

    if (!user) {
      this.logger.warn('User not found', { filterQuery });
    }
    return user;
  }
}
