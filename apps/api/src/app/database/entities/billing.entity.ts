import { IAddress, IUKBankAccount } from '@recitt/types';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Account } from './account.entity';
import { BaseEntity } from './base.entity';

@Entity('billing')
export class Billing extends BaseEntity {
  @OneToOne(() => Account, (account) => account.billingInformation, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @Column({ default: true })
  sameAsBusinessAddress: boolean;

  @Column({ type: 'jsonb', nullable: true })
  address?: IAddress;

  @Column()
  contactPerson?: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'jsonb' })
  bankDetails: IUKBankAccount;
}
