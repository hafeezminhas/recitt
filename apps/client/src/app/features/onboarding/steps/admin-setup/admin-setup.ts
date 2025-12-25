import { CommonModule } from '@angular/common';
import { Component, computed, HostListener, OnInit } from '@angular/core';
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
import {
  IAddAccountAdminUserRequest,
  PersonPronoun,
  PersonTitle,
} from '@recitt/types';
import { InfoTileComponent } from '@shared/components/info-tile/info-tile';
import { DialogService } from '@shared/services/dialog.service';
import { CanComponentDeactivate } from '@shared/types/can-deactivate';
import { AlertType } from '@shared/types/dialog';
import { createTypedFormGroup, matchPasswords } from '@shared/utils';
import { AccountAdminFormValidationSchema } from '@shared/validators/account';
import { Observable, of } from 'rxjs';
import { OnboardingFacade } from '../../+state/onboarding.facade';
import { OnboardingRoutes } from '../../onboarding.routes';

@Component({
  selector: 'app-admin-setup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlertComponent,
    RowComponent,
    ColComponent,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    FormFeedbackComponent,
    FormSelectDirective,
    InfoTileComponent,
  ],
  templateUrl: './admin-setup.html',
  styleUrl: './admin-setup.scss',
})
export class AdminSetup implements OnInit, CanComponentDeactivate {
  // convert PersonTitle enum to array for select options
  readonly personTitleTypes = Object.values(PersonTitle).map((type) => ({
    label: type
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase()),
    value: type,
  }));

  readonly preferredPronoun = Object.values(PersonPronoun).map((type) => ({
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

  adminForm = createTypedFormGroup<IAddAccountAdminUserRequest>(
    {
      accountId: '',
      title: '',
      preferredPronoun: '',
      firstName: '',
      lastName: '',
      middleName: '',
      displayName: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    AccountAdminFormValidationSchema,
    [matchPasswords('password', 'confirmPassword')]
  );
  submitted = false;

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: BeforeUnloadEvent) {
    if (!this.adminForm.dirty || !this.adminForm.touched) {
      return;
    }

    event.preventDefault();
    event.returnValue = '';
  }

  constructor(
    private router: Router,
    private dialog: DialogService,
    private onboardingFacade: OnboardingFacade
  ) {}

  get f(): Record<string, FormControl | FormGroup> {
    return this.adminForm.controls;
  }

  ngOnInit(): void {
    // TODO: To be removed in production code
    this.adminForm.patchValue({
      accountId: this.account$$().id,
      title: PersonTitle.MR,
      preferredPronoun: PersonPronoun.HE,
      firstName: 'John',
      lastName: 'Doe',
      middleName: 'William',
      displayName: 'John W. Doe',
      dateOfBirth: '1990-05-15',
      email: 'admin@company.com',
      phone: '+44 20 1234 5678',
      password: 'SecurePass123!',
      confirmPassword: 'SecurePass123!',
    });
    this.onboardingFacade.nextStepCommand$.subscribe(() => {
      if (this.account$$()?.accountAdmin) {
        this.router.navigate(['/onboarding', OnboardingRoutes.Completion]);
      } else {
        this.submitForm();
      }
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.adminForm.dirty || this.adminForm.touched) {
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
    console.log(this.adminForm.errors);

    if (this.adminForm.valid) {
      const adminDetails = this.adminForm.value as IAddAccountAdminUserRequest;
      this.onboardingFacade.setupAdminUser({
        ...adminDetails,
        accountId: this.account$$().id,
      }); // fire addAccount action through facade
    }
  }
}
