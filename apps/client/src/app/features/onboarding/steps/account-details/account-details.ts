import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertComponent,
  ColComponent,
  FormControlDirective,
  FormDirective,
  FormFeedbackComponent,
  FormLabelDirective,
  FormSelectDirective,
  RowComponent,
} from '@coreui/angular';
import { BusinessAccountType, ICreateAccountRequest } from '@recitt/types';
import { InfoTileComponent } from '@shared/components/info-tile/info-tile';
import { UkAddressPipe } from '@shared/pipes/uk-address/uk-address-pipe';
import { createTypedFormGroup } from '@shared/utils';
import { AccountFormValidationSchema } from '@shared/validators/account';
import { OnboardingFacade } from '../../+state/onboarding.facade';
import { OnboardingRoutes } from '../../onboarding.routes';

@Component({
  selector: 'app-account-details',
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
    UkAddressPipe,
  ],
  templateUrl: './account-details.html',
  styleUrl: './account-details.scss',
})
export class AccountDetails implements OnInit {
  // convert BusinessAccountType enum to array for select options
  readonly businessAccountTypes = Object.values(BusinessAccountType).map(
    (type) => ({
      label: type
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      value: type,
    })
  );

  account$$ = this.onboardingFacade.account$$;
  error$$ = this.onboardingFacade.error$$;

  accountForm = createTypedFormGroup<ICreateAccountRequest>(
    {
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
    },
    AccountFormValidationSchema
  );
  submitted = false;

  constructor(
    private router: Router,
    private onboardingFacade: OnboardingFacade
  ) {}

  get f(): Record<string, FormControl | FormGroup> {
    return this.accountForm.controls;
  }

  ngOnInit(): void {
    // this.onboardingFacade.account$
    //   .pipe(
    //     take(1),
    //     filter((account) => !account),
    //     tap(() => {
    //       if (this.router.url !== '/onboarding') {
    //         this.router.navigate(['/onboarding']);
    //       }
    //     })
    //   )
    //   .subscribe((account) => {
    //     if (account) {
    //       // this.accountForm.patchValue(account);
    //     }
    //   });

    // TODO: To be removed from production code
    this.accountForm.patchValue({
      name: 'Enigma Systems Ltd',
      registrationNumber: '12345678',
      registrationType: BusinessAccountType.LIMITED_COMPANY,
      registrationDate: '2020-01-15',
      address: {
        building: '108 Oldham Court',
        street: 'Bristol Road',
        town: 'Birmingham',
        county: 'West Midlands',
        postcode: 'B5 7AA',
      },
      email: 'abc@a.com',
      phone: '+441234567890',
      alternatePhone: '+441234567891',
      isVatRegistered: false,
      vatNumber: 'GB123456789',
      // "dataProtectionAgreementAccepted": false,
      // "termsAndConditionsAccepted": false
    });

    this.onboardingFacade.nextStepCommand$.subscribe(() => {
      if (this.account$$()) {
        this.router.navigate([
          '/onboarding',
          OnboardingRoutes.BillingInformation,
        ]);
      } else {
        this.submitForm();
      }
    });
  }

  private submitForm(): void {
    this.submitted = true;
    if (this.accountForm.valid) {
      const accountDetails = this.accountForm.value as ICreateAccountRequest;
      this.onboardingFacade.addAccount(accountDetails); // fire addAccount action through facade
    }
  }
}
