/**
 * UK Business Address
 */
export interface UKBusinessAddress {
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
export interface UKCompanyRegistration {
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
export interface UKBankAccount {
  accountHolderName: string;
  accountNumber: string; // 8 digits
  sortCode: string; // Format: XX-XX-XX
  iban?: string; // International Bank Account Number
  bic?: string; // Bank Identifier Code
}

/**
 * Billing Address for invoices
 */
export interface BillingAddress {
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
export interface OnboardingStatusPayload {
  token: string;
  accountId: string;
  expires: string;
}
