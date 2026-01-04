import { AuthService } from '@features/auth/auth.service';
import { ISigninResponse, IUserProfile, UserRole } from '@recitt/types';
import { MockFacade } from '@unit-testing/types';
import { of } from 'rxjs';

export const authServiceMock: MockFacade<AuthService> = {
  apiPrefix: 'auth',

  login: jest
    .fn()
    .mockImplementation((payload) =>
      of<ISigninResponse>({ apiKey: 'mocked-api-key' })
    ),
  getProfile: jest.fn().mockReturnValue(
    of<IUserProfile>({
      firstName: 'Mock',
      middleName: '',
      lastName: 'User',
      displayName: 'Mock User',
      email: 'mock@user.com',
      phone: '+441234567890',
      dateOfBirth: new Date('1990-01-01'),
      accountActivated: true,
      avatar: '',
      role: UserRole.ACCOUNT_USER,
      isDefaultAvatar: true,
    })
  ),
};
