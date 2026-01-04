import { IUserProfile, UserRole } from '@recitt/types';

export const userProfileMock: IUserProfile = {
  firstName: 'John',
  middleName: 'William',
  lastName: 'Doe',
  displayName: 'John W. Doe',
  email: 'admin@company.com',
  phone: '+44 20 1234 5678',
  dateOfBirth: new Date('1990-05-15'),
  accountActivated: true,
  avatar: '',
  role: UserRole.ACCOUNT_ADMIN,
  isDefaultAvatar: true,
};
