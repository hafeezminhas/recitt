import { Address, PersonPronoun, PersonTitle, UserRole } from '@recitt/types';
import * as bcrypt from 'bcrypt';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  OneToOne,
} from 'typeorm';
import { Account } from './account.entity';
import { BaseEntity } from './base.entity';

export const SALT_ROUNDS = 10;

export interface PasswordReset {
  resetOTP: number;
  expires: Date;
}

@Entity('users')
@Index(['email'], { unique: true })
export class User extends BaseEntity {
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.ACCOUNT_USER,
  })
  role: UserRole;

  @OneToOne(() => Account, (account) => account.accountAdmin)
  administeredAccount: Account;

  @Column({
    type: 'enum',
    enum: PersonTitle,
    default: PersonTitle.MR,
  })
  title: PersonTitle;

  @Column({
    type: 'enum',
    enum: PersonPronoun,
    default: PersonPronoun.HE,
  })
  preferredPronouns: PersonPronoun;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column({ nullable: true })
  displayName?: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: Date;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ type: 'jsonb' })
  address?: Address;

  @Column({ select: false })
  password: string;

  @Column({ type: 'bytea', nullable: true })
  avatar?: Buffer;

  @Column({ nullable: true })
  avatarMimeType?: string;

  @Column({ default: true })
  isDefaultAvatar?: boolean;

  @Column({ default: 0 })
  failedLogins: number;

  @Column({ type: 'timestamp with time zone', nullable: true })
  lockedUntil?: Date | null;

  @Column({ nullable: true })
  verificationCode?: string;

  @Column({ default: false })
  accountActivated: boolean;

  @Column({ type: 'jsonb', nullable: true })
  passwordReset?: PasswordReset;

  // To track password changes
  private previousPassword: string;

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    // If password didn't change → skip
    if (this.password === this.previousPassword) return;

    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  }

  // Capture current password after entity loads
  @AfterLoad()
  loadPreviousPassword() {
    this.previousPassword = this.password;
  }
}
