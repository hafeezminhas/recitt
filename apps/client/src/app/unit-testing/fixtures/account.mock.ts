import {
  AccountStatus,
  BusinessAccountType,
  IAccountAdminUserResponse,
  IAccountResponse,
  IAccountResponseWithAdminUser,
  IAccountResponseWithBillingInfo,
  IAddress,
  IBillingInformationResponse,
  IUKBankAccount,
} from '@recitt/types';

const mockAddress: IAddress = {
  building: '123 Main St',
  street: 'Example Street',
  town: 'London',
  county: 'Greater London',
  postcode: 'SW1A 1AA',
};

const mockBankAccount: IUKBankAccount = {
  accountHolderName: 'John Doe',
  accountNumber: '12345678',
  sortCode: '12-34-56',
  iban: 'GB29 NWBK 6016 1331 9268 19',
  bic: 'BARCGB22',
};

const mockBillingInfo: IBillingInformationResponse = {
  id: 'billing-123',
  sameAsBusinessAddress: false,
  address: mockAddress,
  contactPerson: 'Jane Smith',
  email: 'billing@example.com',
  phone: '+44 20 1234 5678',
  bankDetails: mockBankAccount,
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-01-01'),
};

const mockAdminUser: IAccountAdminUserResponse = {
  title: 'Mr',
  preferredPronoun: 'he/him',
  firstName: 'John',
  lastName: 'Doe',
  middleName: 'Middle',
  displayName: 'Johnny',
  dateOfBirth: new Date('1990-01-01'),
  email: 'admin@example.com',
  phone: '+44 20 1234 5678',
  address: mockAddress,
  password: 'hashedpassword',
};

export const accountResponseMock: IAccountResponse = {
  id: 'account-123',
  name: 'Example Company Ltd',
  registrationNumber: '12345678',
  registrationType: BusinessAccountType.LIMITED_COMPANY,
  registrationDate: new Date('2020-01-01'),
  address: mockAddress,
  email: 'info@example.com',
  phone: '+44 20 1234 5678',
  alternatePhone: '+44 20 8765 4321',
  billingInformation: undefined,
  accountAdmin: undefined,
  isVatRegistered: true,
  vatNumber: 'GB123456789',
  vatRegistrationDate: new Date('2020-01-01'),
  status: AccountStatus.VERIFIED,
  statusUpdatedAt: new Date('2023-01-01'),
  suspensionReason: undefined,
  isActive: true,
  deactivatedAt: undefined,
  deactivationReason: undefined,
  createdAt: new Date('2020-01-01'),
  updatedAt: new Date('2023-01-01'),
};

export const accountResponseWithBillingInfoMock: IAccountResponseWithBillingInfo =
  {
    ...accountResponseMock,
    billingInformation: mockBillingInfo,
  };

export const accountResponseWithAdminUserMock: IAccountResponseWithAdminUser = {
  ...accountResponseMock,
  accountAdmin: mockAdminUser,
};
