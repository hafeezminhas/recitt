import { CommonModule } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertComponent,
  ColComponent,
  FormControlDirective,
  FormDirective,
  FormFeedbackComponent,
  FormLabelDirective,
  RowComponent,
} from '@coreui/angular';
import { IAddBillingInfoRequest } from '@recitt/types';
import { InfoTileComponent } from '@shared/components/info-tile/info-tile';
import { DialogService } from '@shared/services/dialog.service';
import { CanComponentDeactivate } from '@shared/types/can-deactivate';
import { AlertType } from '@shared/types/dialog';
import { createTypedFormGroup } from '@shared/utils';
import { BillingInfoFormValidationSchema } from '@shared/validators/account';
import { Observable, of } from 'rxjs';
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
    RowComponent,
    InfoTileComponent,
  ],
  templateUrl: './billing-info.html',
  styleUrl: './billing-info.scss',
})
export class BillingInfo implements OnInit, CanComponentDeactivate {
  account$$ = computed(() => {
    const account = this.onboardingFacade.account$$();
    if (!account) {
      throw new Error('Account is required.');
    }

    return account;
  });
  error$$ = this.onboardingFacade.error$$;

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
      bankDetails: {
        accountHolderName: '',
        accountNumber: '',
        sortCode: '',
        iban: '',
        bic: '',
      },
    },
    BillingInfoFormValidationSchema
  );
  submitted = false;

  constructor(
    private router: Router,
    private dialog: DialogService,
    private onboardingFacade: OnboardingFacade
  ) { }

  get f(): Record<string, FormControl | FormGroup> {
    return this.billingForm.controls;
  }

  ngOnInit(): void {
    // TODO: To be removed in production code
    this.billingForm.patchValue({
      accountId: this.account$$().id,
      sameAsBusinessAddress: false,
      address: {
        building: '123 Business Street',
        street: 'Suite 456',
        town: 'London',
        county: 'Greater London',
        postcode: 'SW1A 1AA',
      },
      contactPerson: 'John Doe',
      email: 'billing@company.com',
      phone: '+44 20 1234 5678',
      bankDetails: {
        accountHolderName: 'Company Ltd',
        accountNumber: '12345678',
        sortCode: '12-34-56',
        iban: 'GB29 NWBK 6016 1331 9268 19',
        bic: 'NWBKGB2L',
      },
    });
    this.onboardingFacade.nextStepCommand$.subscribe(() => {
      if (this.account$$()?.billingInformation) {
        this.router.navigate(['/onboarding', OnboardingRoutes.AdminUser]);
      } else {
        this.submitForm();
      }
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.billingForm.dirty || this.billingForm.touched) {
      return this.dialog.confirm({
        title: 'Unsaved Changes',
        message:
          'You have unsaved changes. Are you sure you want to leave this page?',
        confirmText: 'Leave',
        cancelText: 'Stay',
        type: AlertType.Warning,
      });
    } else {
      return of(true);
    }
  }

  private submitForm(): void {
    this.submitted = true;
    if (this.billingForm.valid) {
      const billingDetails = this.billingForm.value as IAddBillingInfoRequest;
      this.onboardingFacade.addBillingInfo({
        ...billingDetails,
        address: billingDetails.sameAsBusinessAddress
          ? this.account$$().address
          : billingDetails.address,
        accountId: this.account$$().id,
      }); // fire addAccount action through facade
    }
  }
}
