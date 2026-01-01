import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ContainerComponent,
  ProgressBarComponent,
  ProgressModule,
  RowComponent,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import {
  ActivatedRouteProvider,
  OnboardingFacadeProvider,
} from '@unit-testing/providers';
import { OnboardingComponent } from './onboarding';

describe('Onboarding', () => {
  let component: OnboardingComponent;
  let fixture: ComponentFixture<OnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        OnboardingComponent,
        ContainerComponent,
        RowComponent,
        ColComponent,
        CardComponent,
        CardBodyComponent,
        IconDirective,
        ProgressModule,
        ProgressBarComponent,
      ],
      providers: [ActivatedRouteProvider, OnboardingFacadeProvider],
    }).compileComponents();

    fixture = TestBed.createComponent(OnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
