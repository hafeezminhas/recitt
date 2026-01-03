import { createReducer, on, provideState } from '@ngrx/store';

import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { ApiError, IUserProfile } from '@recitt/types';
import { AuthActions } from './auth.actions';
import { AuthEffects } from './auth.effects';
import { AuthFacade } from './auth.facade';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  user: IUserProfile | null;
  apiKey: string | null;
  loading: boolean;
  error: ApiError | null;
}

export const initialState: AuthState = {
  user: null,
  apiKey: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    loading: false,
    apiKey: token,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

export function provideAuthState(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState(AUTH_FEATURE_KEY, authReducer),
    provideEffects([AuthEffects]),
    AuthFacade,
  ]);
}
