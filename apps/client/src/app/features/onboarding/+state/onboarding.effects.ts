import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IAccountResponse } from '@recitt/types';
import { catchError, map, mergeMap, of } from 'rxjs';
import { OnboardingService } from '../onboarding.service';
import { loadAccount, loadAccountFailure, loadAccountSuccess } from './onboarding.actions';

@Injectable()
export class OnboardingEffects {
  constructor(
    private actions$: Actions,
    private onboardingService: OnboardingService
  ) { }

  loadAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAccount),
      mergeMap(({ accountId }) =>
        this.onboardingService.getAccount(accountId).pipe(
          map((account: IAccountResponse) => loadAccountSuccess({ account })),
          catchError((error) => of(loadAccountFailure({ error })))
        )
      )
    )
  );

}
