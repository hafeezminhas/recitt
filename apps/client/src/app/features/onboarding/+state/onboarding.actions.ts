// actions for various onboarding steps
import { createAction, props } from '@ngrx/store';
import { IAccountAdminUserResponse, IAccountResponse, IAddAccountAdminUserRequest, IAddBillingInfoRequest, ICreateAccountRequest } from '@recitt/types';

export const setCurrentStep = createAction(
  '[Onboarding] Set Current Step',
  props<{ step: 1 | 2 | 3 }>()
);
export const resetOnboarding = createAction('[Onboarding] Reset Onboarding');

// Onboarding account loading actions
export const loadAccount = createAction(
  '[Onboarding] Load Account',
  props<{ accountId: string }>()
);
export const loadAccountSuccess = createAction(
  '[Onboarding] Load Account Success',
  props<{ account: IAccountResponse }>()
);
export const loadAccountFailure = createAction(
  '[Onboarding] Load Account Failure',
  props<{ error: string }>()
);

// Onboarding account creation actions
export const addAccount = createAction(
  '[Onboarding] Add Account',
  props<{ accountData: ICreateAccountRequest }>()
);
export const addAccountSuccess = createAction(
  '[Onboarding] Add Account Success',
  props<{ account: IAccountResponse }>()
);
export const addAccountFailure = createAction(
  '[Onboarding] Add Account Failure',
  props<{ error: string }>()
);

// Onboarding billing info actions
export const addBillingInfo = createAction(
  '[Onboarding] Add Billing Info',
  props<{ billingInfo: IAddBillingInfoRequest }>()
);
export const addBillingInfoSuccess = createAction(
  '[Onboarding] Add Billing Info Success',
  props<{ billingInfo: IAddBillingInfoRequest }>()
);
export const addBillingInfoFailure = createAction(
  '[Onboarding] Add Billing Info Failure',
  props<{ error: string }>()
);

// Onboarding admin setup actions
export const setupAdminUser = createAction(
  '[Onboarding] Setup Admin User',
  props<{ user: IAddAccountAdminUserRequest }>() // Replace 'any' with actual admin user data type
);
export const setupAdminUserSuccess = createAction(
  '[Onboarding] Setup Admin User Success',
  props<{ accountAdmin: IAccountAdminUserResponse }>() // Replace 'any' with actual admin user data type
);
export const setupAdminUserFailure = createAction(
  '[Onboarding] Setup Admin User Failure',
  props<{ error: string }>()
);


// Onboarding completion action
export const completeOnboarding = createAction(
  '[Onboarding] Complete Onboarding'
);

