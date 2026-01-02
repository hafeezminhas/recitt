import { AccountStatus, BusinessAccountType } from '../enums/account.enum';
import { IAddress } from './common';

export interface IUKBankAccount {
  accountHolderName: string;
  accountNumber: string;
  sortCode: string;
  iban?: string;
  bic?: string;
}

export interface IBillingInformationResponse {
  id: string;
  sameAsBusinessAddress: boolean;
  address?: IAddress | null;
  contactPerson?: string;
  email: string;
  phone: string;
  bankDetails: IUKBankAccount;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAccountAdminUserResponse {
  title: string;
  preferredPronoun: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  displayName?: string;
  dateOfBirth?: Date;
  email: string;
  phone?: string;
  address?: IAddress;
  password: string;
  avatar?: Buffer;
}

export interface IAccountResponse {
  id: string;
  name: string;
  registrationNumber: string;
  registrationType?: BusinessAccountType;
  registrationDate?: Date;
  address: IAddress;
  email: string;
  phone: string;
  alternatePhone?: string;
  billingInformation?: IBillingInformationResponse;
  accountAdmin?: IAccountAdminUserResponse;
  isVatRegistered?: boolean;
  vatNumber?: string;
  vatRegistrationDate?: Date;
  status: AccountStatus;
  statusUpdatedAt?: Date;
  suspensionReason?: string;
  isActive: boolean;
  deactivatedAt?: Date;
  deactivationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IAccountResponseWithBillingInfo = Omit<
  IAccountResponse,
  'billingInformation'
> & {
  billingInformation: IBillingInformationResponse;
};

export type IAccountResponseWithAdminUser = Omit<
  IAccountResponse,
  'accountAdmin'
> & {
  accountAdmin: IAccountAdminUserResponse;
};

export interface ICreateAccountRequest {
  name: string;
  registrationNumber: string;
  registrationType: BusinessAccountType;
  registrationDate?: string;
  address: IAddress;
  email: string;
  phone: string;
  alternatePhone?: string;
  isVatRegistered?: boolean;
  vatNumber?: string;
}

export interface IAddBillingInfoRequest {
  accountId: string;
  sameAsBusinessAddress: boolean;
  address?: IAddress;
  contactPerson?: string;
  email: string;
  phone: string;
  bankDetails: IUKBankAccount;
}

export interface IAddAccountAdminUserRequest {
  accountId: string;
  title: string;
  preferredPronouns: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  displayName?: string;
  dateOfBirth: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

export interface IAccountAdminUserResponse {
  title: string;
  preferredPronoun: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  displayName?: string;
  dateOfBirth?: Date;
  email: string;
  phone?: string;
  address?: IAddress;
  password: string;
  avatar?: Buffer;
}

/**
 * UK Business Address
 */
export interface IUKBusinessAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string; // UK postcode format
  county?: string;
  country: string; // Should be 'United Kingdom' or 'GB'
}

/**
 * UK Company Registration Details
 */
export interface IUKCompanyRegistration {
  companyName: string;
  companyNumber?: string; // Companies House registration number
  registrationType:
    | 'sole_trader'
    | 'partnership'
    | 'limited_company'
    | 'llp'
    | 'charity';
  registrationDate?: Date;
  vatNumber?: string; // UK VAT number (starts with GB)
}

/**
 * Bank Account Details (for payments)
 */
export interface IUKBankAccount {
  accountHolderName: string;
  accountNumber: string; // 8 digits
  sortCode: string; // Format: XX-XX-XX
  iban?: string; // International Bank Account Number
  bic?: string; // Bank Identifier Code
}

/**
 * Billing Address for invoices
 */
export interface IBillingAddress {
  companyName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  county?: string;
  country: string;
  email: string;
  phone: string;
  contactPerson?: string;
}

/**
 * Payload for Onboarding Status Request
 */
export interface IOnboardingStatusPayload {
  token: string;
  accountId: string;
  expires: string;
}

export interface IAccountActivationPayload {
  activationKey: string;
}
