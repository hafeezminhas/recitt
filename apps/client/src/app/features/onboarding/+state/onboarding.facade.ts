import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import * as OnboardingActions from './onboarding.actions';
import * as fromOnboardingSelectors from './onboarding.selectors';

@Injectable({
  providedIn: 'root',
})
export class OnboardingFacade {
  constructor(private store: Store) {}

  // Selectors
  account$ = this.store.select(fromOnboardingSelectors.getAccount);
  account$$ = this.store.selectSignal(fromOnboardingSelectors.getAccount);
  currentStep$ = this.store.select(fromOnboardingSelectors.getCurrentStep);
  currentStep$$ = this.store.selectSignal(
    fromOnboardingSelectors.getCurrentStep
  );
  isLoading$$ = this.store.selectSignal(fromOnboardingSelectors.isLoading);

  // Business Logic for Navigation
  canAccessStep(step: number): Observable<boolean> {
    return this.account$.pipe(
      map((account) => {
        // if (this.currentStep$$() === 1) return account === null;
        if (step === 2) return account !== null;
        if (step === 3)
          return account !== null && account.billingInformation !== null;
        // if (this.currentStep$$() === 4)
        //   return account !== null && account.accountAdmin !== null; // Success page
        console.log('getting here');

        return false;
      })
    );
  }

  isReadOnly(step: number): Observable<boolean> {
    return this.currentStep$.pipe(map((current) => current > step));
  }

  setCurrentStep(step: number): void {
    this.dispatch(
      OnboardingActions.setCurrentStep({ step: step as 1 | 2 | 3 })
    );
  }

  private dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
