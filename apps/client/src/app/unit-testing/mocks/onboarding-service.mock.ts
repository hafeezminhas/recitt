import { OnboardingService } from '@features/onboarding/onboarding.service';
import { MockFacade } from '@unit-testing/types';
import { of } from 'rxjs';
import {
  accountResponseMock,
  accountResponseWithAdminUserMock,
  accountResponseWithBillingInfoMock,
} from '../fixtures/account.mock';

export const onboardingServiceMock: MockFacade<OnboardingService> = {
  loadOnboarding: jest.fn().mockReturnValue(of(accountResponseWithAdminUserMock)),
  addAccount: jest.fn().mockImplementation((payload) => of(accountResponseMock)),
  addBillingInfo: jest.fn().mockImplementation((payload) => of(accountResponseWithBillingInfoMock)),
  setupAdminUser: jest.fn().mockImplementation((payload) => of(accountResponseWithAdminUserMock)),
  activateCustomer: jest.fn().mockReturnValue(of({ success: true })),
};
