import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin';
import { DashboardComponent } from './dashboard/dashboard';
import { SettingsComponent } from './settings/settings';
import { UsersComponent } from './users/users';

export enum AdminRoutes {
  Dashboard = '',
  UserManagement = 'users',
  Settings = 'settings',
}

// export const onboardingOnLoadResolver: ResolveFn<any> = () => {
//   const onboardingFacade = inject(OnboardingFacade);
//   if (!onboardingFacade.onboardingCompleted$$()) {
//     onboardingFacade.loadAccount();
//   }
//   return of(true);
// };

export const ADMIN_FEATURE_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: AdminRoutes.Dashboard,
        component: DashboardComponent,
        data: { title: 'Admin Dashboard' },
      },
      {
        path: AdminRoutes.UserManagement,
        component: UsersComponent,
        data: { title: 'User Management' },
      },
      {
        path: AdminRoutes.Settings,
        component: SettingsComponent,
        data: { title: 'Account Settings' },
      },
    ],
  },
];
