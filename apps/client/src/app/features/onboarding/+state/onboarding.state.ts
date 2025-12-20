import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { createReducer, on, provideState } from '@ngrx/store';
import { IAccountResponse } from '@recitt/types';
import * as OnboardingActions from './onboarding.actions';
import { OnboardingEffects } from './onboarding.effects';
import { OnboardingFacade } from './onboarding.facade';

export const ONBOARDING_FEATURE_KEY = 'onboarding';

export interface OnboardingState {
  account: IAccountResponse | null;
  currentStep: 1 | 2 | 3;
  loading: boolean;
  error: string | null;
}

export const initialState: OnboardingState = {
  account: null,
  currentStep: 1,
  loading: false,
  error: null,
};


export const onboardingReducer = createReducer(
  initialState,
  on(OnboardingActions.setCurrentStep, (state, { step }) => ({
    ...state,
    currentStep: step,
  })),
  on(OnboardingActions.resetOnboarding, () => initialState),
  // Handling account loading actions
  on(OnboardingActions.loadAccount, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(OnboardingActions.loadAccountSuccess, (state, { account }) => ({
    ...state,
    account,
    loading: false,
  })),
  on(OnboardingActions.loadAccountFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Handling account creation actions can be added here
  on(OnboardingActions.addAccount, (state) => ({
    ...state,
    loading: true,
  })),
  on(OnboardingActions.addAccountSuccess, (state, { account }) => ({
    ...state,
    account,
  })),
  on(OnboardingActions.addAccountFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Handling billing info actions can be added here
  on(OnboardingActions.addBillingInfo, (state) => ({
    ...state,
    loading: true,
  })),
  on(OnboardingActions.addBillingInfoSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(OnboardingActions.addBillingInfoFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Handling admin setup actions can be added here
);

export function provideOnboardingState(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState(ONBOARDING_FEATURE_KEY, onboardingReducer),
    provideEffects([OnboardingEffects]),
    OnboardingFacade
  ]);
}
