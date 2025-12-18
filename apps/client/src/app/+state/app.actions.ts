import { createAction, props } from '@ngrx/store';

export const startLoading = createAction('[App] Start Loading');
export const stopLoading = createAction('[App] Stop Loading');
export const setError = createAction(
  '[App] Set Error',
  props<{ error: string | Error }>()
);
