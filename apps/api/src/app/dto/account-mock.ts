import {
  AccountAdminUserResponseDto,
  BillingInfoResponseDto,
} from './account.dto';

/**
 * Mock Data of Account Dto
 */
export const sampleAccountAdminUserDetails: AccountAdminUserResponseDto = {
  title: 'Mr',
  preferredPronoun: 'He',
  firstName: 'John',
  lastName: 'Doe',
  middleName: 'Michael',
  displayName: 'Johnny',
  dateOfBirth: new Date('1990-01-01'),
  email: 'john.doe@example.com',
  phone: '+1234567890',
  address: {
    building: '123',
    street: 'Main Street',
    town: 'London',
    county: 'Greater London',
    postcode: 'SW1A 1AA',
  },
  password: 'securePassword123',
  avatar: Buffer.from('sample avatar data'),
};

/**
 * Mock Data for BillingInfoResponseDto
 */
export const sampleBillingInfoResponse: BillingInfoResponseDto = {
  id: '0e9ce4ad-cf36-4996-b324-a2537078ef6f',
  createdAt: new Date('2025-12-16T11:22:32.711Z'),
  updatedAt: new Date('2025-12-16T11:22:32.711Z'),
  sameAsBusinessAddress: true,
  address: null,
  contactPerson: 'Jane Doe',
  email: 'abc@a.com',
  phone: '+441234567890',
  bankDetails: {
    accountHolderName: 'John Doe Ltd',
    accountNumber: '12345678',
    sortCode: '20-40-60',
    iban: 'GB82WEST12345698765432',
    bic: 'WESTGB2L',
  },
};
