import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { AuthEffects } from './+state/auth.effects';
import * as fromAuth from './+state/auth.state';
import { LoginComponent } from './pages/login/login.component';

export enum AuthRoutes {
  Signin = 'signin',
  ResetPassword = 'reset-password',
}

export const AUTH_FEATURE_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Login',
    },
    providers: [
      provideState(fromAuth.AUTH_FEATURE_KEY, fromAuth.authReducer),
      provideEffects(AuthEffects),
    ],
  },
];
