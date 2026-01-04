import { Injectable, computed } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICredentials } from '@recitt/types';
import { FacadeBase } from '@shared/types/facade.base';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';
import { AuthActions } from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade extends FacadeBase {
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
  isAuthenticated$$ = computed(() => this.apiKey$$() && !this.authService.isApiKeyExpired());

  constructor(
    store: Store,
    private authService: AuthService
  ) {
    super(store);
  }

  // Actions
  login(credentials: ICredentials): void {
    this.dispatch(AuthActions.login({ credentials }));
  }

  logOut(): void {
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
}
