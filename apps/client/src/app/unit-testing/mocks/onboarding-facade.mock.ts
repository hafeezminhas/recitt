/// <reference types="jest" />

import { signal } from '@angular/core';
import { OnboardingFacade } from '@features/onboarding/+state/onboarding.facade';
import { ApiError, IAccountResponse } from '@recitt/types';
import { of, Subject } from 'rxjs';
import { MockFacade } from '../types';

export const onboardingFacadeMock: MockFacade<OnboardingFacade> = {
  nextStepTrigger$: new Subject<void>(),
  nextStepCommand$: new Subject<void>(),

  // Mock selectors
  account$: of(null),
  account$$: signal<IAccountResponse | null>(null),
  currentStep$: of(1),
  currentStep$$: signal(1),
  onboardingCompleted$: of(false),
  onboardingCompleted$$: signal(false),
  isLoading$$: signal(false),
  error$$: signal<ApiError | null>(null),

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
