import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { AbstractRepository } from './abstract.repository';

@Injectable()
export class UserRepository extends AbstractRepository<UserEntity> {
  logger = new Logger(UserRepository.name);
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepo: Repository<UserEntity>
  ) {
    super(usersRepo);
  }

  async findUser(
    filterQuery: FindOneOptions<UserEntity>
  ): Promise<UserEntity | null> {
    const user = this.findOne(filterQuery);

    if (!user) {
      this.logger.warn('User not found', { filterQuery });
    }
    return user;
  }
}
