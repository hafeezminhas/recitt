/**
 * Account DTOs - Data Transfer Objects for Account Management
 * Uses Swagger @ApiProperty and class-validator decorators
 * Uses existing interfaces and enums from @recitt/types
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  AccountStatus,
  BillingFrequency,
  BusinessAccountType,
  PaymentMethod,
} from '../enums/account.enum';
import { PersonPronoun, PersonTitle } from '../enums/common.enum';
import { Match } from '../utils';
import { AddressDto } from './address.dto';

/**
 * UK Bank Account DTO
 */
export class UKBankAccountDto {
  @ApiProperty({ example: 'John Doe Ltd' })
  @IsString()
  @IsNotEmpty()
  accountHolderName: string;

  @ApiProperty({ example: '12345678', description: '8 digit account number' })
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @ApiProperty({
    example: '20-40-60',
    description: 'Sort code format: XX-XX-XX',
  })
  @IsString()
  @IsNotEmpty()
  sortCode: string;

  @ApiPropertyOptional({ example: 'GB82WEST12345698765432' })
  @IsOptional()
  @IsString()
  iban?: string;

  @ApiPropertyOptional({ example: 'WESTGB2L' })
  @IsOptional()
  @IsString()
  bic?: string;
}

/**
 * CreateAccountDto - Used for creating a new account
 * Includes company registration, business address, and initial billing setup
 */
export class CreateAccountDto {
  // ==================== Company Information ====================

  @ApiProperty({
    example: 'Acme Corporation Ltd',
    description: 'Legal company name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiProperty({
    example: '12345678',
    description: 'Companies House registration number',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  registrationNumber: string;

  @ApiProperty({
    enum: BusinessAccountType,
    example: BusinessAccountType.LIMITED_COMPANY,
    description: 'Type of business registration',
  })
  @IsEnum(BusinessAccountType)
  @IsNotEmpty()
  registrationType: BusinessAccountType;

  @ApiPropertyOptional({
    example: '2020-01-15',
    description: 'Company registration date (ISO format)',
  })
  @IsOptional()
  @IsString()
  registrationDate?: string;

  // ==================== Business Address ====================

  @ApiProperty({
    type: AddressDto,
    description: 'Business address (UK format)',
  })
  @ValidateNested()
  @Type(() => AddressDto)
  @IsNotEmpty()
  address: AddressDto;

  @ApiProperty({
    example: 'abc@a.com',
    description: 'Primary contact email',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '+441234567890',
    description: 'Primary contact phone',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({
    example: '+441234567891',
    description: 'Alternate phone',
  })
  @IsOptional()
  @IsString()
  alternatePhone?: string;

  // ==================== VAT Information ====================

  @ApiPropertyOptional({
    default: false,
    description: 'Whether the account is VAT registered',
  })
  @IsOptional()
  @IsBoolean()
  isVatRegistered?: boolean;

  @ApiPropertyOptional({
    example: 'GB123456789',
    description: 'UK VAT number (11 characters starting with GB)',
  })
  @IsOptional()
  @IsString()
  vatNumber?: string;

  @ApiPropertyOptional({
    example: 5,
    description: 'Maximum number of users allowed on account',
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxUsers?: number;

  // ==================== Compliance ====================

  @ApiPropertyOptional({
    default: false,
    description: 'Data Protection Agreement acceptance',
  })
  @IsOptional()
  @IsBoolean()
  dataProtectionAgreementAccepted?: boolean;

  @ApiPropertyOptional({
    default: false,
    description: 'Terms and Conditions acceptance',
  })
  @IsOptional()
  @IsBoolean()
  termsAndConditionsAccepted?: boolean;
}

/**
 * Add billing info  DTO
 */
export class AddBillingInfoDto {
  @ApiProperty({ example: 'account-uuid' })
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  sameAsBusinessAddress: boolean;

  @ApiProperty({ type: AddressDto })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiPropertyOptional({ example: 'Jane Doe' })
  @IsString()
  contactPerson?: string;

  @ApiProperty({ example: 'abc@a.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+441234567890' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({ example: '+441234567891' })
  @IsOptional()
  @IsString()
  alternatePhone?: string;

  @ApiProperty({ type: UKBankAccountDto })
  @ValidateNested()
  @Type(() => UKBankAccountDto)
  bankDetails: UKBankAccountDto;

  @ApiProperty({ example: PaymentMethod.BANK_TRANSFER })
  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  preferredPaymentMethod: string;

  @ApiProperty({ example: BillingFrequency.MONTHLY })
  @IsEnum(BillingFrequency)
  @IsNotEmpty()
  invoicingFrequency: string;

  @ApiProperty({ example: 30, description: 'Payment terms in days' })
  @IsNumber()
  @Min(0)
  paymentTermsDays: number; // Net-30, Net-60, etc.

  @ApiProperty({ example: true })
  @IsBoolean()
  emailInvoices: boolean;

  @ApiPropertyOptional({ example: 'abc@a.com' })
  @IsOptional()
  @IsString()
  invoicingEmail?: string; // Email for sending invoices

  @ApiProperty({ example: false })
  @IsBoolean()
  autoPaymentEnabled: boolean;
}

/**
 * Add admin user DTO
 */
export class AddAccountAdminUserDto {
  @ApiProperty({ example: 'account-uuid' })
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @ApiProperty({ example: PersonTitle.MR })
  @IsString()
  @IsNotEmpty()
  title: PersonTitle;

  @ApiProperty({ example: PersonPronoun.HE })
  @IsString()
  @IsNotEmpty()
  preferredPronouns: PersonPronoun;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiPropertyOptional({
    example: 'Michael',
    description: 'Middle name (optional)',
  })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional({
    example: 'Johnny',
    description: 'Display name (optional)',
  })
  @IsOptional()
  @IsString()
  displayName?: string;

  @ApiProperty({ example: '1990-01-01', required: false })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({ example: 'admin@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}

/**
 * UpdateAccountDto - Used for updating existing account details
 * All fields are optional
 */
export class UpdateAccountDto {
  // ==================== Company Information ====================

  @ApiPropertyOptional({
    example: 'Acme Corporation Ltd',
    description: 'Legal company name',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  companyName?: string;

  @ApiPropertyOptional({
    example: '12345678',
    description: 'Companies House registration number',
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  companyRegistrationNumber?: string;

  @ApiPropertyOptional({
    enum: BusinessAccountType,
    example: BusinessAccountType.LIMITED_COMPANY,
    description: 'Type of business registration',
  })
  @IsOptional()
  @IsEnum(BusinessAccountType)
  registrationType?: BusinessAccountType;

  @ApiPropertyOptional({
    example: '2020-01-15',
    description: 'Company registration date (ISO format)',
  })
  @IsOptional()
  @IsString()
  registrationDate?: string;

  // ==================== Business Address ====================

  @ApiPropertyOptional({
    type: AddressDto,
    description: 'Business address (UK format)',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;

  // ==================== VAT Information ====================

  @ApiPropertyOptional({
    default: false,
    description: 'Whether the account is VAT registered',
  })
  @IsOptional()
  @IsBoolean()
  isVatRegistered?: boolean;

  @ApiPropertyOptional({
    example: 'GB123456789',
    description: 'UK VAT number (11 characters starting with GB)',
  })
  @IsOptional()
  @IsString()
  vatNumber?: string;

  // ==================== Account Configuration ====================

  @ApiPropertyOptional({
    example: 5,
    description: 'Maximum number of users allowed on account',
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  maxUsers?: number;

  // ==================== Compliance ====================

  @ApiPropertyOptional({
    default: false,
    description: 'Data Protection Agreement acceptance',
  })
  @IsOptional()
  @IsBoolean()
  dataProtectionAgreementAccepted?: boolean;

  @ApiPropertyOptional({
    default: false,
    description: 'Terms and Conditions acceptance',
  })
  @IsOptional()
  @IsBoolean()
  termsAndConditionsAccepted?: boolean;
}
/**
 * UpdateAccountStatusDto - Used to update account status
 */
export class UpdateAccountStatusDto {
  @ApiProperty({
    enum: AccountStatus,
    example: AccountStatus.VERIFIED,
    description: 'New account status',
  })
  @IsEnum(AccountStatus)
  @IsNotEmpty()
  status: AccountStatus;

  @ApiPropertyOptional({
    example: 'Payment failed',
    description: 'Reason for suspension (if applicable)',
  })
  @IsOptional()
  @IsString()
  suspensionReason?: string;
}

/**
 * SuspendAccountDto - Used to suspend an account
 */
export class SuspendAccountDto {
  @ApiProperty({
    example: 'Payment overdue',
    description: 'Reason for suspension',
  })
  @IsString()
  @IsNotEmpty()
  reason: string;
}

/**
 * DeactivateAccountDto - Used to deactivate an account
 */
export class DeactivateAccountDto {
  @ApiProperty({
    example: 'No longer needed',
    description: 'Reason for deactivation',
  })
  @IsString()
  @IsNotEmpty()
  reason: string;
}

/**
 * ReactivateAccountDto - Used to reactivate a deactivated account
 */
export class ReactivateAccountDto {
  @ApiProperty({
    example: true,
    description: 'Confirm reactivation',
  })
  @IsBoolean()
  @IsNotEmpty()
  confirmReactivation: boolean;
}

/**
 * UpdateBillingSettingsDto - Used to update billing settings
 */
export class UpdateBillingSettingsDto {
  @ApiPropertyOptional({
    enum: PaymentMethod,
    example: PaymentMethod.BANK_TRANSFER,
    description: 'Preferred payment method',
  })
  @IsOptional()
  @IsEnum(PaymentMethod)
  preferredPaymentMethod?: PaymentMethod;

  @ApiPropertyOptional({
    enum: BillingFrequency,
    example: BillingFrequency.QUARTERLY,
    description: 'Invoicing frequency',
  })
  @IsOptional()
  @IsEnum(BillingFrequency)
  invoicingFrequency?: BillingFrequency;

  @ApiPropertyOptional({
    example: 60,
    description: 'Payment terms in days',
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  paymentTermsDays?: number;
}

/**
 * ComplianceAcceptanceDto - Accept compliance documents
 */
export class ComplianceAcceptanceDto {
  @ApiPropertyOptional({
    default: false,
    description: 'Accept Data Protection Agreement',
  })
  @IsOptional()
  @IsBoolean()
  dataProtectionAgreementAccepted?: boolean;

  @ApiPropertyOptional({
    default: false,
    description: 'Accept Terms and Conditions',
  })
  @IsOptional()
  @IsBoolean()
  termsAndConditionsAccepted?: boolean;
}

/**
 * AccountResponseDto - Standard API response DTO containing account fields
 */
export class AccountResponseDto {
  @ApiProperty({ example: 'account-uuid' })
  id!: string;

  @ApiProperty({ example: 'Acme Corporation Ltd' })
  name!: string;

  @ApiProperty({ example: '12345678' })
  registrationNumber!: string;

  @ApiProperty({ type: AddressDto })
  address!: AddressDto;

  @ApiProperty({ example: 'billing@acme.com' })
  billingEmail!: string;

  @ApiProperty({ example: '+441234567890' })
  billingPhone!: string;

  @ApiPropertyOptional({ example: '+441234567891' })
  alternatePhone?: string;

  @ApiPropertyOptional({ example: 'billing_123' })
  billingInformation?: string;

  @ApiPropertyOptional({ example: 'user_123' })
  accountAdminId?: string;

  @ApiPropertyOptional({ example: ['user_1', 'user_2'] })
  users?: string[];

  @ApiPropertyOptional({ example: false })
  isVatRegistered?: boolean;

  @ApiPropertyOptional({ example: 'GB123456789' })
  vatNumber?: string;

  @ApiPropertyOptional({ example: '2020-01-15' })
  vatRegistrationDate?: string;

  @ApiPropertyOptional({ example: 5 })
  maxUsers?: number;

  @ApiPropertyOptional({ example: ['note 1'] })
  notes?: string[];

  @ApiProperty({
    enum: AccountStatus,
    example: AccountStatus.PENDING_VERIFICATION,
  })
  status!: AccountStatus;

  @ApiPropertyOptional({ example: '2020-01-15' })
  statusUpdatedAt?: string;

  @ApiPropertyOptional({ example: 'Fraud detected' })
  suspensionReason?: string;

  @ApiProperty({ example: true })
  isActive!: boolean;

  @ApiPropertyOptional({ example: '2020-01-15' })
  deactivatedAt?: string;

  @ApiPropertyOptional({ example: 'Closed by admin' })
  deactivationReason?: string;

  @ApiProperty({ example: '2020-01-01T00:00:00Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2020-01-02T00:00:00Z' })
  updatedAt!: Date;
}

/**
 * AccountDetailedDto - Extended account response with relations
 */
export class AccountDetailedDto extends AccountResponseDto {
  @ApiPropertyOptional({ example: '2020-01-15' })
  registrationDate?: string;

  @ApiPropertyOptional({ enum: BusinessAccountType })
  registrationType?: BusinessAccountType;

  @ApiPropertyOptional({ example: true })
  dataProtectionAgreementSigned?: boolean;

  @ApiPropertyOptional({ example: '2020-01-15' })
  dataProtectionAgreementDate?: string;

  @ApiPropertyOptional({ example: true })
  termsAndConditionsAccepted?: boolean;

  @ApiPropertyOptional({ example: '2020-01-15' })
  termsAndConditionsDate?: string;
}
