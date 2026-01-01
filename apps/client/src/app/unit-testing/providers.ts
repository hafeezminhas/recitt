import { Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnboardingFacade } from '@features/onboarding/+state/onboarding.facade';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  activatedRouteMock,
  ngbActiveModalMock,
  onboardingFacadeMock,
} from './mocks';

/**
 * Providers
 */
export const ActivatedRouteProvider: Provider = {
  provide: ActivatedRoute,
  useValue: activatedRouteMock,
};

export const OnboardingFacadeProvider: Provider = {
  provide: OnboardingFacade,
  useValue: onboardingFacadeMock,
};

export const NgbActiveModalProvider: Provider = {
  provide: NgbActiveModal,
  useValue: ngbActiveModalMock,
};
