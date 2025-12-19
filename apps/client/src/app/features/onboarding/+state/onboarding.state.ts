import { AccountResponseDto } from '@recitt/types';

export const ONBOARDING_FEATURE_KEY = 'onboarding';

export interface OnboardingState {
  account: AccountResponseDto | null;
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
