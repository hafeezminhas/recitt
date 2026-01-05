import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  IAddAccountAdminUserRequest,
  IAddBillingInfoRequest,
  ICreateAccountRequest,
} from '@recitt/types';
import { FacadeBase } from '@shared/types/facade.base';
import { map, Observable, Subject } from 'rxjs';
import * as OnboardingActions from './onboarding.actions';
import * as fromOnboardingSelectors from './onboarding.selectors';

@Injectable({
  providedIn: 'root',
})
export class OnboardingFacade extends FacadeBase {
  private nextStepTrigger$ = new Subject<void>();
  nextStepCommand$ = this.nextStepTrigger$.asObservable();

  // Selectors
  account$ = this.store.select(fromOnboardingSelectors.getAccount);
  account$$ = this.store.selectSignal(fromOnboardingSelectors.getAccount);
  currentStep$ = this.store.select(fromOnboardingSelectors.getCurrentStep);
  currentStep$$ = this.store.selectSignal(
    fromOnboardingSelectors.getCurrentStep
  );
  onboardingCompleted$ = this.store.select(
    fromOnboardingSelectors.isOnboardingCompleted
  );
  onboardingCompleted$$ = this.store.selectSignal(
    fromOnboardingSelectors.isOnboardingCompleted
  );
  isLoading$$ = this.store.selectSignal(fromOnboardingSelectors.isLoading);
  error$$ = this.store.selectSignal(fromOnboardingSelectors.selectError);

  constructor(store: Store) {
    super(store);
  }

  // Business Logic for Navigation
  canAccessStep(step: number | string): Observable<boolean> {
    return this.account$.pipe(
      map((account) => {
        switch (step) {
          case 1:
            return true;
          case 2:
            return account !== null;
          case 3:
            return account !== null && account.billingInformation !== null;
          default:
            return false;
        }
        return false;
      })
    );
  }

  isReadOnly(step: number): Observable<boolean> {
    return this.currentStep$.pipe(map((current) => current > step));
  }

  nextStep(): void {
    this.nextStepTrigger$.next();
  }

  // Actions dispatchers
  setCurrentStep(step: number): void {
    this.dispatch(
      OnboardingActions.setCurrentStep({ step: step as 1 | 2 | 3 })
    );
  }

  resetOnboarding(): void {
    this.dispatch(OnboardingActions.resetOnboarding());
  }

  loadAccount(): void {
    this.dispatch(OnboardingActions.loadAccount);
  }

  addAccount(payload: ICreateAccountRequest): void {
    this.dispatch(OnboardingActions.addAccount({ payload }));
  }

  addBillingInfo(payload: IAddBillingInfoRequest): void {
    this.dispatch(OnboardingActions.addBillingInfo({ payload }));
  }

  setupAdminUser(payload: IAddAccountAdminUserRequest): void {
    this.dispatch(OnboardingActions.setupAdminUser({ payload }));
  }
}
