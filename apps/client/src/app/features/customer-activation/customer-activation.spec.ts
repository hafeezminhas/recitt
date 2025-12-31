import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerActivation } from './customer-activation';

describe('CustomerActivation', () => {
  let component: CustomerActivation;
  let fixture: ComponentFixture<CustomerActivation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerActivation],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerActivation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
