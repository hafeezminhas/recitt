import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { jwtDecode } from 'jwt-decode';

import { OnboardingService } from '@features/onboarding/onboarding.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerActivationResolver implements Resolve<any> {
  constructor(private onboardingService: OnboardingService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const activationKey = route.paramMap.get('activationKey');

    if (!activationKey) {
      return of({ success: false, message: 'Activation key is missing.' });
    }

    // Check if token is expired or invalid by decoding payload
    try {
      const payload = jwtDecode(activationKey);
      const currentTime = Math.floor(Date.now() / 1000);

      if (payload.exp && payload.exp < currentTime) {
        return of({ success: false, message: 'Activation key has expired.' });
      }
    } catch (error) {
      return of({ success: false, message: 'Activation key is invalid.' });
    }

    // If valid, call activateCustomer
    return this.onboardingService.activateCustomer(activationKey).pipe(
      map(({ status, message }) => ({
        success: status,
        message: message,
      })),
      catchError((error) => {
        const errorMessage =
          error.error?.message || 'Failed to activate account.';
        return of({ success: false, message: errorMessage });
      })
    );
  }
}
