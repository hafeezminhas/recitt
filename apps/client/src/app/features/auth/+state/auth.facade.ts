import { computed, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { ICredentials } from '@recitt/types';
import { FacadeBase } from '@shared/types/facade.base';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { map } from 'rxjs';
import { AuthActions } from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade extends FacadeBase {
  // Selectors
  user$ = this.store.select(AuthSelectors.authUser);
  user$$ = this.store.selectSignal(AuthSelectors.authUser);
  isAccountAdmin$ = this.store.select(AuthSelectors.isAccountAdmin);
  isAccountAdmin$$ = this.store.selectSignal(AuthSelectors.isAccountAdmin);
  apiKey$$ = this.store.selectSignal(AuthSelectors.apiKey);
  isLoading$ = this.store.select(AuthSelectors.isAuthLoading);
  isLoading$$ = this.store.selectSignal(AuthSelectors.isAuthLoading);
  error$ = this.store.select(AuthSelectors.authError);
  error$$ = this.store.selectSignal(AuthSelectors.authError);

  // Computed selectors
  isAuthenticated$ = this.user$.pipe(map((user) => !!user));
  isAuthenticated$$ = computed(
    () => this.apiKey$$() && !this.isApiKeyExpired()
  );

  constructor(store: Store) {
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

  private isApiKeyExpired() {
    const token = localStorage.getItem(environment.authKey);
    if (!token) {
      return true;
    }
    // use jwtDecode to check the token expiry
    try {
      const decoded: JwtPayload = jwtDecode(token);
      const exp = decoded?.exp;
      if (!exp || typeof exp !== 'number') {
        return true;
      }
      const now = Math.floor(Date.now() / 1000);
      return exp <= now;
    } catch {
      return true;
    }
  }
}
