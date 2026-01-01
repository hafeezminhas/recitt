import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRouteProvider } from '@unit-testing/index';
import { CustomerActivationComponent } from './customer-activation';

describe('CustomerActivation', () => {
  let component: CustomerActivationComponent;
  let fixture: ComponentFixture<CustomerActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerActivationComponent],
      providers: [ActivatedRouteProvider],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
