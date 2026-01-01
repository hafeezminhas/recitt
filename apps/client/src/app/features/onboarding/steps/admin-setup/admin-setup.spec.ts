import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnboardingFacadeProvider } from '@unit-testing/providers';
import { AdminSetup } from './admin-setup';

describe('AdminSetup', () => {
  let component: AdminSetup;
  let fixture: ComponentFixture<AdminSetup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSetup],
      providers: [OnboardingFacadeProvider],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSetup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
