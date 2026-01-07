/// <reference types="jest" />

// signals are represented as callable selectors on the real facade;
// in the mock we use jest.fn() to mirror that callable signature.
import { signal } from '@angular/core';
import { AuthFacade } from '@features/auth/+state/auth.facade';
import { ApiError, IUserProfile } from '@recitt/types';
import { of } from 'rxjs';
import { MockFacade } from '../types';

export const authFacadeMock: MockFacade<AuthFacade> = {
  // Mock selectors
  user$: of(null),
  // callable selectors (signals) are mocked as jest functions that return values
  user$$: jest.fn().mockReturnValue(signal<IUserProfile | null>(null)),
  isAccountAdmin$: of(true),
  isAccountAdmin$$: jest.fn().mockReturnValue(true),
  apiKey$$: jest.fn().mockReturnValue(signal<string | null>(null)),
  isLoading$: of(false),
  isLoading$$: jest.fn().mockReturnValue(signal(false)),
  error$: of(null),
  error$$: jest.fn().mockReturnValue(signal<ApiError | null>(null)),
  isAuthenticated$: of(false),
  isAuthenticated$$: jest.fn().mockReturnValue(signal(false)),

  // Mock methods
  login: jest.fn(),
  logOut: jest.fn(),
  loadUserProfile: jest.fn(),
  requestPasswordReset: jest.fn(),
  resetPassword: jest.fn(),
};

export function createAuthFacadeMock(
  overrides?: Partial<MockFacade<AuthFacade>>
): MockFacade<AuthFacade> {
  return {
    ...authFacadeMock,
    ...overrides,
  };
}
