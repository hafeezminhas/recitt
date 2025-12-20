import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';

export interface AppState {
  loading: boolean;
  error?: string | Error;
}

export const initialState: AppState = {
  loading: false,
};

export const appReducer = createReducer(
  initialState,
  on(AppActions.startLoading, (state, _) => ({
    ...state,
    loading: true,
  })),
  on(AppActions.stopLoading, (state, _) => ({
    ...state,
    loading: false,
  })),
  on(AppActions.setError, (state, { error }) => ({
    ...state,
    error
  })),
);
