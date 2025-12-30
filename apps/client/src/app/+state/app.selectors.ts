import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const appState = createFeatureSelector<AppState>('app');

export const isAppLoading = createSelector(appState, (state) => state.loading);
export const getAppError = createSelector(appState, (state) => state.error);

// export const selectLoading = createSelector(
//   appState,
//   (state: AppState) => state.loading
// );

// export const selectError = createSelector(
//   appState,
//   (state: AppState) => state.error
// );
