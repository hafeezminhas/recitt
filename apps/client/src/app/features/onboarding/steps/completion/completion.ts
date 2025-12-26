import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, RowComponent } from '@coreui/angular';
import { OnboardingFacade } from '../../+state/onboarding.facade';

@Component({
  selector: 'app-completion',
  imports: [
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    RouterModule
  ],
  templateUrl: './completion.html',
  styleUrl: './completion.scss',
})
export class CompletionComponent {
  account$$ = this.onboardingFacade.account$$;

  constructor(private onboardingFacade: OnboardingFacade) { }
}
