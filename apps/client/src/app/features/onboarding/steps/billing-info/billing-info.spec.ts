import { ComponentFixture, TestBed } from '@angular/core/testing';
import { accountResponseMock } from '@unit-testing/mocks';
import { provideOnboardingFacade } from '@unit-testing/providers';
import { BillingInfo } from './billing-info';

describe('BillingInfo', () => {
  let component: BillingInfo;
  let fixture: ComponentFixture<BillingInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingInfo],
      providers: [
        provideOnboardingFacade({
          account$$: jest.fn().mockImplementation(() => accountResponseMock),
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BillingInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
