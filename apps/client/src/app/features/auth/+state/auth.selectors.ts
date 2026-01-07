import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserRole } from '@recitt/types';
import { AUTH_FEATURE_KEY, AuthState } from './auth.state';

export const authState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const isAuthLoading = createSelector(
  authState,
  (state: AuthState) => state.loading
);

export const apiKey = createSelector(authState, (state) => state.apiKey);

export const authUser = createSelector(
  authState,
  (state: AuthState) => state.user
);

export const isAccountAdmin = createSelector(
  authUser,
  (authUser) => authUser?.role === UserRole.ACCOUNT_ADMIN
);

export const authError = createSelector(
  authState,
  (state: AuthState) => state.error
);
