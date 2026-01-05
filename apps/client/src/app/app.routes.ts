import { inject } from '@angular/core';
import { ResolveFn, Routes } from '@angular/router';
import { CustomerActivationResolver } from '@features/customer-activation/customer-activation.resolver';
import { authGuard } from '@shared/guards/route.guard';
import { AuthFacade } from './features/auth/+state/auth.facade';
import { provideOnboardingState } from './features/onboarding/+state/onboarding.state';

// On route navigation, if an api key exists (user previously signed in)
// trigger loading the user profile so the app initializes auth state.
export const userProfileResolver: ResolveFn<boolean> = () => {
  const authFacade = inject(AuthFacade);
  try {
    if (authFacade.isAuthenticated$$()) {
      authFacade.loadUserProfile();
    }
  } catch {
    // ignore storage errors in some environments
  }
  return true;
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    resolve: {
      profile: userProfileResolver
    },
    loadComponent: () =>
      import('./layout').then((m) => m.DefaultLayoutComponent),
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/routes').then((m) => m.routes),
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/routes').then((m) => m.routes),
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/routes').then((m) => m.routes),
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/routes').then((m) => m.routes),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/routes').then((m) => m.routes),
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/routes').then((m) => m.routes),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/routes').then((m) => m.routes),
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/routes').then((m) => m.routes),
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/routes').then((m) => m.routes),
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: '404',
    loadComponent: () =>
      import('./views/pages/page404/page404.component').then(
        (m) => m.Page404Component
      ),
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    loadComponent: () =>
      import('./views/pages/page500/page500.component').then(
        (m) => m.Page500Component
      ),
    data: {
      title: 'Page 500',
    },
  },
  // {
  //   path: 'login',
  //   loadComponent: () =>
  //     import('./views/pages/login/login.component').then(
  //       (m) => m.LoginComponent
  //     ),
  //   data: {
  //     title: 'Login Page',
  //   },
  // },
  // {
  //   path: 'register',
  //   loadComponent: () =>
  //     import('./views/pages/register/register.component').then(
  //       (m) => m.RegisterComponent
  //     ),
  //   data: {
  //     title: 'Register Page',
  //   },
  // },
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((a) => a.AUTH_FEATURE_ROUTES),
  },
  {
    path: 'onboarding',
    providers: [provideOnboardingState()],
    loadChildren: () =>
      import('./features/onboarding/onboarding.routes').then(
        (m) => m.ONBOARDING_FEATURE_ROUTES
      ),
    data: {
      title: 'Customer Onboarding',
    },
  },
  {
    path: 'customer-activation/:activationKey',
    resolve: {
      data: CustomerActivationResolver,
    },
    loadComponent: () =>
      import('./features/customer-activation/customer-activation').then(
        (m) => m.CustomerActivationComponent
      ),
    data: {
      title: 'Customer Activation',
    },
  },
  { path: '**', redirectTo: 'dashboard' },
];
