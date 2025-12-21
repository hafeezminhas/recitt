import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IAccountResponse } from '@recitt/types';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { OnboardingService } from '../onboarding.service';
import * as OnboardingActions from './onboarding.actions';

@Injectable()
export class OnboardingEffects {
  constructor(
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
          catchError((error) =>
            of(OnboardingActions.loadAccountFailure({ error }))
          )
        )
      )
    )
  );

  //   addAccountSuccess$ = createEffect(() =>
  //     this.actions$.pipe(ofType(OnboardingActions.addAccountSuccess),
  //   switchMap(() => of(OnboardingActions))
  // )
  //   );
}
