import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ColComponent, FormControlDirective, FormDirective, FormFeedbackComponent, FormLabelDirective, FormSelectDirective, RowComponent } from "@coreui/angular";
import { BusinessAccountType, ICreateAccountRequest } from '@recitt/types';
import { ValidatorModel } from '@shared/types/to-form-types';
import { createTypedFormGroup } from '@shared/utils';
import { take } from 'rxjs';
import { OnboardingFacade } from '../../+state/onboarding.facade';

@Component({
  selector: 'app-account-details',
  imports: [
    ReactiveFormsModule,
    ColComponent,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    FormFeedbackComponent,
    FormSelectDirective,
    RowComponent
  ],
  templateUrl: './account-details.html',
  styleUrl: './account-details.scss',
})
export class AccountDetails implements OnInit {
  // convert BusinessAccountType enum to array for select options
  readonly businessAccountTypes = Object.values(BusinessAccountType).map((type) => ({
    label: type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
    value: type,
  }));

  accountFormValidationSchema: ValidatorModel<ICreateAccountRequest> = {
    name: [Validators.required],
    registrationNumber: [Validators.required],
    registrationType: [Validators.required],
    registrationDate: [Validators.required],
    address: {
      building: [Validators.required],
      street: [Validators.required],
      town: [Validators.required],
      county: [],
      postcode: [Validators.required],
    },
    email: [Validators.required, Validators.email],
    phone: [Validators.required],
    alternatePhone: [],
    isVatRegistered: [],
    vatNumber: [],
  };
  accountForm = createTypedFormGroup<ICreateAccountRequest>({
    name: '',
    registrationNumber: '',
    registrationType: BusinessAccountType.LIMITED_COMPANY,
    registrationDate: '',
    address: {
      building: '',
      street: '',
      town: '',
      county: '',
      postcode: '',
    },
    email: '',
    phone: '',
    alternatePhone: '',
    isVatRegistered: false,
    vatNumber: '',
  }, this.accountFormValidationSchema);
  submitted = false;

  constructor(private onboardingFacade: OnboardingFacade) { }

  get f(): Record<string, FormControl | FormGroup> {
    return this.accountForm.controls;
  }

  ngOnInit(): void {
    this.onboardingFacade.account$.pipe(take(1)).subscribe((account) => {
      if (account) {
        this.accountForm.patchValue(account);
      }
    });

    this.onboardingFacade.nextStepCommand$.subscribe(() => {
      this.submitForm();
    });
  }

  private submitForm(): void {
    this.submitted = true;
    if (this.accountForm.valid) {
      const accountDetails: ICreateAccountRequest = this.accountForm.value as ICreateAccountRequest;
      console.log('Account Details Submitted:', accountDetails);
      this.onboardingFacade.setCurrentStep(2); // Move to the next step
    } else {
      console.log('Form is invalid');
    }
  }
}
