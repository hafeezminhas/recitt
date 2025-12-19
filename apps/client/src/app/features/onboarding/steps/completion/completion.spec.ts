import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Completion } from './completion';

describe('Completion', () => {
  let component: Completion;
  let fixture: ComponentFixture<Completion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Completion],
    }).compileComponents();

    fixture = TestBed.createComponent(Completion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
