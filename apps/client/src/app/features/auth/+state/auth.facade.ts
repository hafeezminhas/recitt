import { Injectable, computed } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { ICredentials } from '@recitt/types';
import { map } from 'rxjs';
import { AuthActions } from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  // Selectors
  user$ = this.store.select(AuthSelectors.authUser);
  user$$ = this.store.selectSignal(AuthSelectors.authUser);
  apiKey$$ = this.store.selectSignal(AuthSelectors.apiKey);
  isLoading$ = this.store.select(AuthSelectors.isAuthLoading);
  isLoading$$ = this.store.selectSignal(AuthSelectors.isAuthLoading);
  error$ = this.store.select(AuthSelectors.authError);
  error$$ = this.store.selectSignal(AuthSelectors.authError);

  // Computed selectors
  isAuthenticated$ = this.user$.pipe(map((user) => !!user));
  isAuthenticated$$ = computed(() => this.user$$() !== null);

  constructor(private store: Store) {}

  // Actions
  login(credentials: ICredentials): void {
    this.dispatch(AuthActions.login({ credentials }));
  }

  logout(): void {
    this.dispatch(AuthActions.logout());
  }

  loadUserProfile(): void {
    this.dispatch(AuthActions.loadUserProfile());
  }

  requestPasswordReset(email: string): void {
    this.dispatch(AuthActions.requestPasswordReset({ email }));
  }

  resetPassword(token: string, newPassword: string): void {
    this.dispatch(AuthActions.resetPassword({ token, newPassword }));
  }

  private dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
