import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ContainerComponent,
  RowComponent,
} from '@coreui/angular';
import { Observable } from 'rxjs';
import { OnboardingFacade } from '../+state/onboarding.facade';

@Component({
  selector: 'app-onboarding',
  imports: [
    CommonModule,
    RouterOutlet,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
  ],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Onboarding {
  currentStep$$ = this.onboardingFacade.currentStep$$;
  steps = [
    {
      step: 1,
      title: 'Business Detail',
      desc: 'Enter business details and other information',
    },
    {
      step: 2,
      title: 'Billing Detail',
      desc: 'Enter billing details and other information',
    },
    {
      step: 3,
      title: 'Account Admin Setup',
      desc: 'Enter account admin details and other information',
    },
  ];

  constructor(private onboardingFacade: OnboardingFacade) {}

  canAccess(step: number): Observable<boolean> {
    return this.onboardingFacade.canAccessStep(step);
  }
}
