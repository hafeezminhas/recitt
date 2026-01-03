import { Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnboardingFacade } from '@features/onboarding/+state/onboarding.facade';
import { OnboardingService } from '@features/onboarding/onboarding.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '@shared/services/data.service';
import {
  activatedRouteMock,
  createOnboardingFacadeMock,
  dataServiceMock,
  ngbActiveModalMock,
  onboardingFacadeMock,
  onboardingServiceMock,
} from './mocks';
import { MockFacade } from './types';

/**
 * Angular internal Providers
 */
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

/**
 * Services related providers
 */
export const DataServiceProvider: Provider = {
  provide: DataService,
  useValue: dataServiceMock
};

export const OnboardingServiceProvider: Provider = {
  provide: OnboardingService,
  useValue: onboardingServiceMock,
};
