import { Validators } from '@angular/forms';
import {
  IAddAccountAdminUserRequest,
  IAddBillingInfoRequest,
  ICreateAccountRequest,
} from '@recitt/types';
import { ValidatorModel } from '@shared/types/to-form-types';
import { AddressValidator } from './address';

export const AccountFormValidationSchema: ValidatorModel<ICreateAccountRequest> =
{
  name: [Validators.required],
  registrationNumber: [Validators.required],
  registrationType: [Validators.required],
  registrationDate: [Validators.required],
  address: AddressValidator,
  email: [Validators.required, Validators.email],
  phone: [Validators.required],
  alternatePhone: [],
  isVatRegistered: [],
  vatNumber: [],
};

export const BillingInfoFormValidationSchema: ValidatorModel<IAddBillingInfoRequest> =
{
  contactPerson: [Validators.required],
  email: [Validators.required],
  phone: [Validators.required],
  sameAsBusinessAddress: [Validators.required],
  bankDetails: {
    accountHolderName: [Validators.required],
    accountNumber: [Validators.required],
    sortCode: [Validators.required],
    iban: [],
    bic: [Validators.required],
  },
};

export const AccountAdminFormValidationSchema: ValidatorModel<IAddAccountAdminUserRequest> =
{
  accountId: [Validators.required],
  title: [Validators.required],
  preferredPronouns: [Validators.required],
  firstName: [Validators.required],
  lastName: [Validators.required],
  middleName: [],
  displayName: [],
  dateOfBirth: [Validators.required],
  email: [Validators.required, Validators.email],
  phone: [],
  password: [Validators.required, Validators.minLength(8)],
  confirmPassword: [Validators.required],
};
