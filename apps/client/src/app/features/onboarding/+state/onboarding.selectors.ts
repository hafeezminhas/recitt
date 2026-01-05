import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ONBOARDING_FEATURE_KEY, OnboardingState } from './onboarding.state';

export const onboardingState = createFeatureSelector<OnboardingState>(
  ONBOARDING_FEATURE_KEY
);

export const getAccount = createSelector(
  onboardingState,
  ({ account }) => account
);

export const getCurrentStep = createSelector(
  onboardingState,
  (state) => state.currentStep
);

export const isLoading = createSelector(
  onboardingState,
  (state) => state.loading
);

export const selectError = createSelector(
  onboardingState,
  (state) => state.error
);

export const isOnboardingCompleted = createSelector(
  onboardingState,
  (state) => {
    return (
      state.account !== null &&
      state.account.billingInformation !== null &&
      state.account.accountAdmin !== null
    );
  }
);
