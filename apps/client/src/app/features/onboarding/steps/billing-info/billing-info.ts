import { CommonModule } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertComponent,
  ColComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  FormControlDirective,
  FormDirective,
  FormFeedbackComponent,
  FormLabelDirective,
  FormSelectDirective,
  RowComponent,
} from '@coreui/angular';
import { IAddBillingInfoRequest, PaymentMethod } from '@recitt/types';
import { InfoTileComponent } from '@shared/components/info-tile/info-tile';
import { ValidatorModel } from '@shared/types/to-form-types';
import { createTypedFormGroup } from '@shared/utils';
import { OnboardingFacade } from '../../+state/onboarding.facade';
import { OnboardingRoutes } from '../../onboarding.routes';

@Component({
  selector: 'app-billing-info',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlertComponent,
    ColComponent,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    FormFeedbackComponent,
    FormSelectDirective,
    RowComponent,
    InfoTileComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
  ],
  templateUrl: './billing-info.html',
  styleUrl: './billing-info.scss',
})
export class BillingInfo implements OnInit {
  // convert paymentMethodTypes enum to array for select options
  readonly paymentMethodTypes = Object.values(PaymentMethod).map((type) => ({
    label: type
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    value: type,
  }));

  account$$ = computed(() => {
    const account = this.onboardingFacade.account$$();
    if (!account) {
      throw new Error('Account is required.');
    }

    return account;
  });
  error$$ = this.onboardingFacade.error$$;

  billingInfoFormValidationSchema: ValidatorModel<IAddBillingInfoRequest> = {
    sameAsBusinessAddress: [Validators.required],
    contactPerson: [Validators.required],
    email: [Validators.required],
    phone: [Validators.required],
    alternatePhone: [],
    bankDetails: {
      accountHolderName: [Validators.required],
      accountNumber: [Validators.required],
      sortCode: [Validators.required],
      iban: [],
      bic: [Validators.required],
    },
    preferredPaymentMethod: [Validators.required],
    invoicingFrequency: [Validators.required],
    paymentTermsDays: [Validators.required],
    emailInvoice: [Validators.required],
    invoicingEmail: [],
    autoPaymentEnabled: [Validators.required],
  };

  billingForm = createTypedFormGroup<IAddBillingInfoRequest>(
    {
      accountId: '',
      sameAsBusinessAddress: false,
      address: {
        building: '',
        street: '',
        town: '',
        county: '',
        postcode: '',
      },
      contactPerson: '',
      email: '',
      phone: '',
      alternatePhone: '',
      bankDetails: {
        accountHolderName: '',
        accountNumber: '',
        sortCode: '',
        iban: '',
        bic: '',
      },
      preferredPaymentMethod: '',
      invoicingFrequency: '',
      paymentTermsDays: 0,
      emailInvoice: false,
      invoicingEmail: '',
      autoPaymentEnabled: false,
    },
    this.billingInfoFormValidationSchema
  );
  submitted = false;

  constructor(
    private router: Router,
    private onboardingFacade: OnboardingFacade
  ) {}

  get f(): Record<string, FormControl | FormGroup> {
    return this.billingForm.controls;
  }

  ngOnInit(): void {
    this.billingForm.patchValue({
      sameAsBusinessAddress: true,
      address: this.account$$().address,
    });
    this.onboardingFacade.nextStepCommand$.subscribe(() => {
      if (this.account$$()?.billingInformation) {
        this.router.navigate(['/onboarding', OnboardingRoutes.AdminUser]);
      } else {
        this.submitForm();
      }
    });
  }

  private submitForm(): void {
    this.submitted = true;
    if (this.billingForm.valid) {
      const billingDetails = this.billingForm.value as IAddBillingInfoRequest;
      this.onboardingFacade.addBillingInfo({
        ...billingDetails,
        accountId: this.account$$().id,
      }); // fire addAccount action through facade
    }
  }
}
