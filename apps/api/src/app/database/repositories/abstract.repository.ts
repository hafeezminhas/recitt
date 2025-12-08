import { Logger, NotFoundException } from '@nestjs/common';
import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from '../entities/base.entity';

export abstract class AbstractRepository<T extends BaseEntity> {
  protected abstract readonly logger: Logger;

  constructor(private readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(query: FindOneOptions<T>): Promise<T> {
    try {
      const entity = await this.repository.findOne(query);
      if (!entity) {
        console.warn(`[Resource Not found`);
      }
      return entity;
    } catch (err) {
      console.error(
        `[Repository:${this.logger}] FindOne failed: ${err.message}`
      );
      throw new NotFoundException(`Resource not found.`);
    }
  }

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    await this.repository.update(id, data as QueryDeepPartialEntity<T>);
    return this.findOne({ where: { id } } as unknown as FindOneOptions<T>);
  }

  async remove(id: string): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Resource with ID ${id} not found for deletion.`
      );
    }
  }
}
