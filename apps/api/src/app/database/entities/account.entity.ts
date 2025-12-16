import { JoinColumn, OneToMany } from 'typeorm';
// account.entity.ts
import { AccountStatus, Address, BusinessAccountType } from '@recitt/types';
import { Column, Entity, Index, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Billing } from './billing.entity';
import { Note } from './note.entity';
import { User } from './user.entity';

@Entity()
@Index(['name', 'email', 'registrationNumber', 'vatNumber'], { unique: true })
export class Account extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  registrationNumber: string;

  @Column({
    type: 'enum',
    enum: [
      BusinessAccountType.SOLE_TRADER,
      BusinessAccountType.PARTNERSHIP,
      BusinessAccountType.LIMITED_COMPANY,
      BusinessAccountType.LLP,
      BusinessAccountType.CHARITY,
    ],
    default: BusinessAccountType.LIMITED_COMPANY,
  })
  registrationType: BusinessAccountType;

  @Column({ nullable: true })
  registrationDate?: Date;

  @Column({ type: 'jsonb' })
  address: Address;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  alternatePhone?: string;

  @OneToOne(() => Billing, (billingInfo) => billingInfo.account)
  billingInformation: Billing;

  @Column({ default: 5 })
  maxUsers: number;

  @OneToOne(() => User, (user) => user.administeredAccount, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'accountAdminId' })
  accountAdmin: User;

  @OneToMany(() => User, (user) => user.id)
  users: string[];

  @Column({ default: false })
  isVatRegistered: boolean;

  @Column({ nullable: true, unique: true })
  vatNumber?: string; // e.g., GB123456789 (11 characters starting with GB)

  @Column({ nullable: true })
  vatRegistrationDate?: Date;

  // ==================== Compliance & Documentation ====================

  @Column({ default: false })
  dataProtectionAgreementSigned!: boolean;

  @Column({ nullable: true })
  dataProtectionAgreementDate?: Date;

  @Column({ default: false })
  termsAndConditionsAccepted!: boolean;

  @Column({ nullable: true })
  termsAndConditionsDate?: Date;

  @OneToMany(() => Note, (note) => note.id)
  notes: Note[]; // Internal notes about the account

  // ==================== Account Status ====================

  @Column({ default: AccountStatus.PENDING_VERIFICATION })
  status: string;

  @Column({ nullable: true })
  statusUpdatedAt?: Date;

  @Column({ nullable: true })
  suspensionReason?: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  deactivatedAt?: Date;

  @Column({ nullable: true })
  deactivationReason?: string;
}
