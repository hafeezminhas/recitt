import { OneToMany } from 'typeorm';
// account.entity.ts
import { AccountStatus, Address, BusinessAccountType } from '@recitt/types';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
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

  @Column({ nullable: true })
  @OneToOne(() => Billing, (billing) => billing.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  billingInformation: string;

  @Column({ default: 5 })
  maxUsers: number;

  @Column({ nullable: true })
  @OneToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  accountAdmin: string;

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
