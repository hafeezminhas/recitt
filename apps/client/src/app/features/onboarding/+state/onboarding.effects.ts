import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IAccountResponse } from '@recitt/types';
import { normalizeError } from '@shared/utils';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { OnboardingRoutes } from '../onboarding.routes';
import { OnboardingService } from '../onboarding.service';
import * as OnboardingActions from './onboarding.actions';

@Injectable()
export class OnboardingEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private onboardingService: OnboardingService
  ) {}

  loadAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OnboardingActions.loadAccount),
      mergeMap(({ accountId }) =>
        this.onboardingService.getAccount(accountId).pipe(
          map((account: IAccountResponse) =>
            OnboardingActions.loadAccountSuccess({ account })
          ),
          catchError((error) =>
            of(OnboardingActions.loadAccountFailure({ error }))
          )
        )
      )
    )
  );

  addAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OnboardingActions.addAccount),
      switchMap(({ payload }) =>
        this.onboardingService.addAccount(payload).pipe(
          map((account) => OnboardingActions.addAccountSuccess({ account })),
          catchError((error: HttpErrorResponse) =>
            of(
              OnboardingActions.addAccountFailure({
                error: normalizeError(error),
              })
            )
          )
        )
      )
    )
  );

  addAccountSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OnboardingActions.addAccountSuccess),
        tap(() =>
          this.router.navigate([
            `/onboarding`,
            OnboardingRoutes.BillingInformation,
          ])
        )
      ),
    { dispatch: false }
  );

  addBillingInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OnboardingActions.addBillingInfo),
      switchMap(({ payload }) =>
        this.onboardingService.addBillingInfo(payload).pipe(
          map((account) =>
            OnboardingActions.addBillingInfoSuccess({ account })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              OnboardingActions.addBillingInfoFailure({
                error: normalizeError(error),
              })
            )
          )
        )
      )
    )
  );

  addBillingInfoSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OnboardingActions.addBillingInfoSuccess),
        tap(() =>
          this.router.navigate([`/onboarding`, OnboardingRoutes.AdminUser])
        )
      ),
    { dispatch: false }
  );
}
