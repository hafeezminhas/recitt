export interface OnboardingState {
  currentStep: 1 | 2 | 3;
  customerId: string | null;
  billingCompleted: boolean;
  adminCreated: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: OnboardingState = {
  currentStep: 1,
  customerId: null,
  billingCompleted: false,
  adminCreated: false,
  loading: false,
  error: null,
};
