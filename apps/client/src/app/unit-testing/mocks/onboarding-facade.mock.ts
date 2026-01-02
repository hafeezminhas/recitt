/// <reference types="jest" />

// signals are represented as callable selectors on the real facade;
// in the mock we use jest.fn() to mirror that callable signature.
import { signal } from '@angular/core';
import { OnboardingFacade } from '@features/onboarding/+state/onboarding.facade';
import { of, Subject } from 'rxjs';
import { MockFacade } from '../types';

export const onboardingFacadeMock: MockFacade<OnboardingFacade> = {
  nextStepCommand$: new Subject<void>(),

  // Mock selectors
  account$: of(null),
  // callable selectors (signals) are mocked as jest functions that return values
  account$$: jest.fn().mockReturnValue(signal(null)),
  currentStep$: of(1),
  currentStep$$: jest.fn().mockReturnValue(1),
  onboardingCompleted$: of(false),
  onboardingCompleted$$: jest.fn().mockReturnValue(false),
  isLoading$$: jest.fn().mockReturnValue(false),
  error$$: jest.fn().mockReturnValue(null),

  // Mock methods
  canAccessStep: jest.fn(),
  isReadOnly: jest.fn(),
  nextStep: jest.fn(),
  setCurrentStep: jest.fn(),
  resetOnboarding: jest.fn(),
  loadAccount: jest.fn(),
  addAccount: jest.fn(),
  addBillingInfo: jest.fn(),
  setupAdminUser: jest.fn(),
};

export function createOnboardingFacadeMock(
  overrides?: Partial<MockFacade<OnboardingFacade>>
): MockFacade<OnboardingFacade> {
  return {
    ...onboardingFacadeMock,
    ...overrides,
  };
}
