import { Provider } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFacade } from '@features/auth/+state/auth.facade';
import { OnboardingFacade } from '@features/onboarding/+state/onboarding.facade';
import { OnboardingService } from '@features/onboarding/onboarding.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '@shared/services/data.service';
import {
  activatedRouteMock,
  authFacadeMock,
  createAuthFacadeMock,
  createOnboardingFacadeMock,
  dataServiceMock,
  ngbActiveModalMock,
  onboardingFacadeMock,
  onboardingServiceMock,
  routerMock,
} from './mocks';
import { MockFacade } from './types';

/**
 * Angular internal Providers
 */
export const RouterProvider: Provider = {
  provide: Router,
  useValue: routerMock,
};

export const ActivatedRouteProvider: Provider = {
  provide: ActivatedRoute,
  useValue: activatedRouteMock,
};

/**
 * Providers related to external libs
 */
export const NgbActiveModalProvider: Provider = {
  provide: NgbActiveModal,
  useValue: ngbActiveModalMock,
};

/**
 * Facade related providers
 */
export const provideOnboardingFacade = (
  overrides?: Partial<MockFacade<OnboardingFacade>>
): Provider => ({
  provide: OnboardingFacade,
  useValue: overrides
    ? createOnboardingFacadeMock(overrides)
    : onboardingFacadeMock,
});

export const provideAuthFacade = (
  overrides?: Partial<MockFacade<AuthFacade>>
): Provider => ({
  provide: AuthFacade,
  useValue: overrides ? createAuthFacadeMock(overrides) : authFacadeMock,
});

/**
 * Services related providers
 */
export const DataServiceProvider: Provider = {
  provide: DataService,
  useValue: dataServiceMock,
};

export const OnboardingServiceProvider: Provider = {
  provide: OnboardingService,
  useValue: onboardingServiceMock,
};
