import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ContainerComponent,
  ProgressBarComponent,
  ProgressModule,
  RowComponent,
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
    ProgressBarComponent,
  ],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingComponent {
  readonly icons = freeSet;
  currentStep$$ = this.onboardingFacade.currentStep$$;
  isLastStep$$ = computed(() => this.currentStep$$() === 3);
  isLoading$$ = this.onboardingFacade.isLoading$$;
  onboardingCompleted$$ = this.onboardingFacade.onboardingCompleted$$;
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

  constructor(
    private router: Router,
    private onboardingFacade: OnboardingFacade
  ) {}

  isStepCompleted(step: number): boolean {
    switch (step) {
      case 1:
        return this.onboardingFacade.account$$() !== null;
      case 2:
        return (
          this.onboardingFacade.account$$() !== null &&
          this.onboardingFacade.account$$()?.billingInformation !== null
        );
      case 3:
        return this.onboardingFacade.onboardingCompleted$$();
      default:
        return false;
    }
  }

  canAccess(step: number): Observable<boolean> {
    return this.onboardingFacade.canAccessStep(step);
  }

  goBack(): void {
    if (this.currentStep$$() > 1) {
      this.onboardingFacade.setCurrentStep(this.currentStep$$() - 1);
    }
  }

  nextStep(): void {
    // if (this.currentStep$$() < 3) {
    this.onboardingFacade.nextStep();
    // }
  }
}
