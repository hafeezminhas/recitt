import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
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
import { IAddAccountAdminUserRequest } from '@recitt/types';
import { InfoTileComponent } from '@shared/components/info-tile/info-tile';
import { DialogService } from '@shared/services/dialog.service';
import { createTypedFormGroup } from '@shared/utils';
import { OnboardingFacade } from '../../+state/onboarding.facade';

@Component({
  selector: 'app-admin-setup',
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
  templateUrl: './admin-setup.html',
  styleUrl: './admin-setup.scss',
})
export class AdminSetup {
  account$$ = computed(() => {
    const account = this.onboardingFacade.account$$();
    if (!account) {
      throw new Error('Account is required.');
    }

    return account;
  });
  error$$ = this.onboardingFacade.error$$;

  adminForm = createTypedFormGroup<IAddAccountAdminUserRequest>(
    {
      accountId: '',
      title: '',
      preferredPronoun: '',
      firstName: '',
      lastName: '',
      middleName: '',
      displayName: '',
      dateOfBirth: new Date(),
      email: '',
      phone: '',
      password: '',
    }
    // BillingInfoFormValidationSchema
  );
  submitted = false;

  constructor(
    private router: Router,
    private dialog: DialogService,
    private onboardingFacade: OnboardingFacade
  ) {}

  get f(): Record<string, FormControl | FormGroup> {
    return this.adminForm.controls;
  }
}
