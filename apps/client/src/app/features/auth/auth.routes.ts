import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export enum AuthRoutes {
  Signin = 'signin',
  ResetPassword = 'reset-password',
}

export const AUTH_FEATURE_ROUTES: Routes = [
  {
    path: AuthRoutes.Signin,
    component: LoginComponent,
    data: {
      title: 'Login',
    },
  },
];
