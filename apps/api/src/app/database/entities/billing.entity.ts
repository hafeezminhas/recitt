import {
  BillingFrequency,
  IAddress,
  IUKBankAccount,
  PaymentMethod,
} from '@recitt/types';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Account } from './account.entity';
import { BaseEntity } from './base.entity';

/**
 * BillingEntity - UK Business Billing Information
 * Stores comprehensive billing and payment details for UK-based businesses
 */
@Entity('billing')
export class Billing extends BaseEntity {
  @OneToOne(() => Account, (account) => account.billingInformation, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'accountId' })
  account: Account;
  // ==================== Company Information ====================

  @Column({ default: true })
  sameAsBusinessAddress: boolean; // Billing address same as business address

  @Column({ type: 'jsonb', nullable: true })
  address?: IAddress;

  @Column()
  contactPerson?: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  alternatePhone?: string;

  @Column({ type: 'jsonb' })
  bankDetails: IUKBankAccount;

  // ==================== Payment & Billing Settings ====================

  @Column({ default: PaymentMethod.BANK_TRANSFER })
  preferredPaymentMethod: string;

  @Column({ default: BillingFrequency.MONTHLY })
  invoicingFrequency: string;

  @Column({ default: 30 })
  paymentTermsDays: number; // Net-30, Net-60, etc.

  @Column({ default: true })
  emailInvoices: boolean;

  @Column({ nullable: true })
  invoicingEmail?: string; // Email for sending invoices

  @Column({ default: false })
  autoPaymentEnabled: boolean;
}
