import { Billing } from '@database/entities/billing.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AbstractRepository } from './abstract.repository';

@Injectable()
export class BillingRepository extends AbstractRepository<Billing> {
  logger = new Logger(BillingRepository.name);
  constructor(
    @InjectRepository(Billing)
    private readonly billingRepo: Repository<Billing>
  ) {
    super(billingRepo);
  }
}
