import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbActiveModalProvider } from '@unit-testing/providers';
import { Agreement } from './agreement';

describe('Agreement', () => {
  let component: Agreement;
  let fixture: ComponentFixture<Agreement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Agreement],
      providers: [NgbActiveModalProvider],
    }).compileComponents();

    fixture = TestBed.createComponent(Agreement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
