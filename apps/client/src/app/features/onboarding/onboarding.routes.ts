import { Routes } from '@angular/router';
import { Onboarding } from './onboarding-page/onboarding';
import { AccountDetails } from './steps/account-details/account-details';
import { AdminSetup } from './steps/admin-setup/admin-setup';
import { BillingInfo } from './steps/billing-info/billing-info';
import { Completion } from './steps/completion/completion';

export enum OnboardingRoutes {
  AccountDetails = '',
  BillingInformation = 'billing-info',
  AdminUser = 'admin-setup',
  Completion = 'completion',
}

export const stepSequence = [
  OnboardingRoutes.AccountDetails,
  OnboardingRoutes.BillingInformation,
  OnboardingRoutes.AdminUser,
  OnboardingRoutes.Completion,
];

export const ONBOARDING_FEATURE_ROUTES: Routes = [
  {
    path: '',
    component: Onboarding,
    children: [
      {
        path: OnboardingRoutes.AccountDetails,
        component: AccountDetails,
        // canActivate: [OnboardingGuard],
        data: { stepNumber: 1, nextStep: OnboardingRoutes.BillingInformation },
      },
      {
        path: OnboardingRoutes.BillingInformation,
        component: BillingInfo,
        // canActivate: [OnboardingGuard],
        data: { stepNumber: 2, nextStep: OnboardingRoutes.AdminUser },
      },
      {
        path: OnboardingRoutes.AdminUser,
        component: AdminSetup,
        // canActivate: [OnboardingGuard],
        data: { stepNumber: 3, nextStep: OnboardingRoutes.Completion },
      },
      {
        path: OnboardingRoutes.Completion,
        component: Completion,
        // canActivate: [OnboardingGuard],
        data: { stepNumber: 4 },
      }
    ],
  },
];
