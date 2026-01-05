import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

import { environment } from '@env/environment';
import { ApiError } from '@recitt/types';
import { AuthService } from '../auth.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private authService: AuthService
  ) { }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((res) => AuthActions.loginSuccess({ token: res.apiKey })),
          catchError((error) =>
            of(
              AuthActions.loginFailure({
                error: (error as ApiError) || { message: 'Login failed' },
              })
            )
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ token }) => {
          try {
            localStorage.setItem(environment.authKey, token);
          } catch {
            /* ignore errors */
          }
          this.router.navigateByUrl('/dashboard');
        })
      ),
    { dispatch: false }
  );

  loadUserProfile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loadUserProfile),
        exhaustMap(() => this.authService.getProfile().pipe(
          map(profile => AuthActions.loadUserProfileSuccess({ user: profile })),
          catchError((error) => of(AuthActions.loadUserProfileFailure({ error })))
        ))
      )
  );

  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.removeItem(environment.authKey);
        this.router.navigate(['signin']);
      })
    ),
    { dispatch: false }
  )
}
