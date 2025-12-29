import { inject } from '@angular/core';
import { ResolveFn, Routes } from '@angular/router';
import { UnsavedChangesGuard } from '@shared/guards/unsaved-changes.guard';
import { of } from 'rxjs';
import { OnboardingFacade } from './+state/onboarding.facade';
import { OnboardingComponent } from './onboarding-page/onboarding';
import { OnboardingGuard } from './onboarding.guard';
import { AccountDetails } from './steps/account-details/account-details';
import { AdminSetup } from './steps/admin-setup/admin-setup';
import { BillingInfo } from './steps/billing-info/billing-info';
import { CompletionComponent } from './steps/completion/completion';

export enum OnboardingRoutes {
  AccountDetails = '',
  BillingInformation = 'billing-info',
  AdminUser = 'admin-setup',
  Completion = 'completion',
}

export const onboardingRoutesList: string[] = [
  OnboardingRoutes.AccountDetails,
  OnboardingRoutes.BillingInformation,
  OnboardingRoutes.AdminUser,
];

export const onboardingOnLoadResolver: ResolveFn<any> = () => {
  const onboardingFacade = inject(OnboardingFacade);
  if (!onboardingFacade.onboardingCompleted$$()) {
    onboardingFacade.loadAccount();
  }
  return of(true);
};

export const ONBOARDING_FEATURE_ROUTES: Routes = [
  {
    path: '',
    component: OnboardingComponent,
    resolve: {
      account: onboardingOnLoadResolver,
    },
    children: [
      {
        path: OnboardingRoutes.AccountDetails,
        component: AccountDetails,
        canActivate: [OnboardingGuard],
        canDeactivate: [UnsavedChangesGuard],
        data: { step: 1, nextStep: OnboardingRoutes.BillingInformation },
      },
      {
        path: OnboardingRoutes.BillingInformation,
        component: BillingInfo,
        canActivate: [OnboardingGuard],
        canDeactivate: [UnsavedChangesGuard],
        data: { step: 2, nextStep: OnboardingRoutes.AdminUser },
      },
      {
        path: OnboardingRoutes.AdminUser,
        component: AdminSetup,
        canActivate: [OnboardingGuard],
        canDeactivate: [UnsavedChangesGuard],
        data: { step: 3, nextStep: OnboardingRoutes.Completion },
      },
      {
        path: OnboardingRoutes.Completion,
        component: CompletionComponent,
        canActivate: [OnboardingGuard],
        data: { step: 'completion' },
      },
    ],
  },
];
