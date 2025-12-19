import { Injectable } from '@nestjs/common';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import * as fromOnboardingSelectors from './onboarding.selectors';
import { OnboardingState } from './onboarding.state';

@Injectable()
export class OnboardingFacade {
  constructor(private store: Store<OnboardingState>) {}

  // Selectors
  account$ = this.store.select(fromOnboardingSelectors.getAccount);
  account$$ = this.store.selectSignal(fromOnboardingSelectors.getAccount);
  currentStep$ = this.store.select(fromOnboardingSelectors.getCurrentStep);
  currentStep$$ = this.store.selectSignal(
    fromOnboardingSelectors.getCurrentStep
  );

  // Business Logic for Navigation
  canAccessStep(step: number): Observable<boolean> {
    return this.account$.pipe(
      map((account) => {
        // if (this.currentStep$$() === 1) return account === null;
        // if (this.currentStep$$() === 2) return account !== null;
        // if (this.currentStep$$() === 3)
        //   return account !== null && account.billingInformation !== null;
        // // if (this.currentStep$$() === 4)
        // //   return account !== null && account.accountAdmin !== null; // Success page
        // console.log('getting here');

        // return false;

        return true;
      })
    );
  }

  isReadOnly(step: number): Observable<boolean> {
    return this.currentStep$.pipe(map((current) => current > step));
  }
}
