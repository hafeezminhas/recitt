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
  // Login reducers
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
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
  })),

  // Profile reducers
  on(AuthActions.loadUserProfile, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.loadUserProfileSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(AuthActions.loadUserProfileFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  // Logout
  on(AuthActions.logout, () => initialState)
);

export function provideAuthState(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState(AUTH_FEATURE_KEY, authReducer),
    provideEffects([AuthEffects]),
    AuthFacade,
  ]);
}
