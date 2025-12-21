import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { ICreateAccountRequest } from '@recitt/types';
import { map, Observable, Subject } from 'rxjs';
import * as OnboardingActions from './onboarding.actions';
import * as fromOnboardingSelectors from './onboarding.selectors';

@Injectable({
  providedIn: 'root',
})
export class OnboardingFacade {
  private nextStepTrigger$ = new Subject<void>();
  nextStepCommand$ = this.nextStepTrigger$.asObservable();

  // Selectors
  account$ = this.store.select(fromOnboardingSelectors.getAccount);
  account$$ = this.store.selectSignal(fromOnboardingSelectors.getAccount);
  currentStep$ = this.store.select(fromOnboardingSelectors.getCurrentStep);
  currentStep$$ = this.store.selectSignal(
    fromOnboardingSelectors.getCurrentStep
  );
  isLoading$$ = this.store.selectSignal(fromOnboardingSelectors.isLoading);

  constructor(private store: Store) {}

  // Business Logic for Navigation
  canAccessStep(step: number): Observable<boolean> {
    return this.account$.pipe(
      map((account) => {
        switch (step) {
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

  setCurrentStep(step: number): void {
    this.dispatch(
      OnboardingActions.setCurrentStep({ step: step as 1 | 2 | 3 })
    );
  }

  nextStep(): void {
    this.nextStepTrigger$.next();
  }

  addAccount(payload: ICreateAccountRequest): void {
    this.dispatch(OnboardingActions.addAccount({ payload }));
  }

  private dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
