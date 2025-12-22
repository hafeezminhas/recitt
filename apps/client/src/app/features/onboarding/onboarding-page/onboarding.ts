import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ContainerComponent,
  ProgressBarComponent,
  ProgressModule,
  RowComponent
} from '@coreui/angular';
import { freeSet } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { Observable } from 'rxjs';
import { OnboardingFacade } from '../+state/onboarding.facade';
import { OnboardingRoutes } from '../onboarding.routes';

@Component({
  selector: 'app-onboarding',
  imports: [
    CommonModule,
    RouterModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    IconDirective,
    ProgressModule,
    ProgressBarComponent
  ],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Onboarding {
  readonly icons = freeSet;
  currentStep$$ = this.onboardingFacade.currentStep$$;
  isLoading$$ = this.onboardingFacade.isLoading$$;
  steps = [
    {
      number: 1,
      label: 'Business Detail',
      path: OnboardingRoutes.AccountDetails,
    },
    {
      number: 2,
      label: 'Billing Detail',
      path: OnboardingRoutes.BillingInformation,
    },
    {
      number: 3,
      label: 'Account Admin Setup',
      path: OnboardingRoutes.AdminUser,
    },
  ];

  constructor(private onboardingFacade: OnboardingFacade) { }

  canAccess(step: number): Observable<boolean> {
    return this.onboardingFacade.canAccessStep(step);
  }

  goBack(): void {
    if (this.currentStep$$() > 1) {
      this.onboardingFacade.setCurrentStep(this.currentStep$$() - 1);
    }
  }

  nextStep(): void {
    if (this.currentStep$$() < 3) {
      this.onboardingFacade.nextStep();
    }
  }
}
