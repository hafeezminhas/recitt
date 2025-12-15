export enum AccountStatus {
  PENDING_VERIFICATION = 'pending_verification',
  VERIFIED = 'verified',
  SUSPENDED = 'suspended',
  INACTIVE = 'inactive',
}

export enum BusinessAccountType {
  SOLE_TRADER = 'sole_trader',
  PARTNERSHIP = 'partnership',
  LIMITED_COMPANY = 'limited_company',
  LLP = 'llp',
  CHARITY = 'charity',
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  BANK_TRANSFER = 'bank_transfer',
  DIRECT_DEBIT = 'direct_debit',
  STANDING_ORDER = 'standing_order',
}

export enum BillingFrequency {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  ANNUALLY = 'annually',
}
