import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  IAccountResponse,
  IAccountResponseWithBillingInfo
} from '@recitt/types';
import { filterNullOrUndefined, normalizeError } from '@shared/utils';
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
  ) { }

  /**
   * Reload onboarding effects
   */

  loadAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OnboardingActions.loadAccount),
      mergeMap(() =>
        this.onboardingService.loadOnboarding().pipe(
          map((account: IAccountResponse | IAccountResponseWithBillingInfo) => OnboardingActions.loadAccountSuccess({
            account
          })
          ),
          catchError((error) =>
            of(OnboardingActions.loadAccountFailure({ error }))
          )
        )
      )
    )
  );

  loadAccountSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OnboardingActions.loadAccountSuccess),
        filterNullOrUndefined(),
        map(({ account }) => account),
        tap((account: IAccountResponse | IAccountResponseWithBillingInfo) => {
          if (account) {
            this.router.navigate([
              `/onboarding`,
              account.billingInformation
                ? OnboardingRoutes.AdminUser
                : OnboardingRoutes.BillingInformation,
            ]);
          }
        })
      ),
    { dispatch: false }
  );

  /**
   * Add account effects
   */

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

  setupAdminUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OnboardingActions.setupAdminUser),
      switchMap(({ payload }) =>
        this.onboardingService.setupAdminUser(payload).pipe(
          map((account) =>
            OnboardingActions.setupAdminUserSuccess({ account })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              OnboardingActions.setupAdminUserFailure({
                error: normalizeError(error),
              })
            )
          )
        )
      )
    )
  );

  setupAdminUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OnboardingActions.setupAdminUserSuccess),
        tap(() =>
          this.router.navigate([`/onboarding`, OnboardingRoutes.Completion])
        )
      ),
    { dispatch: false }
  );
}
