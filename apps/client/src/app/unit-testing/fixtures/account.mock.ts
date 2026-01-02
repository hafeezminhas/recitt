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
  id: '0890e238-e4ca-4799-a0a7-8e78d0f6032b',
  name: 'Enigma Systems Ltd',
  registrationNumber: '12345678',
  registrationType: BusinessAccountType.LIMITED_COMPANY,
  registrationDate: new Date('2020-01-15'),
  address: {
    building: '108 Oldham Court',
    street: 'Bristol Road',
    town: 'Birmingham',
    county: 'West Midlands',
    postcode: 'B5 7AA',
  },
  email: 'abc@a.com',
  phone: '+441234567890',
  alternatePhone: '+441234567891',
  isVatRegistered: false,
  vatNumber: 'GB123456789',
  status: AccountStatus.PENDING_VERIFICATION,
  isActive: false,
  createdAt: new Date('2025-12-29T16:14:36.729Z'),
  updatedAt: new Date('2025-12-29T16:14:36.729Z'),
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
