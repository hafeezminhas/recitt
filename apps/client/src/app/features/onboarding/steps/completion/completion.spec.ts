import { ComponentFixture, TestBed } from '@angular/core/testing';
import { accountResponseWithAdminUserMock } from '@unit-testing/mocks';
import { provideOnboardingFacade } from '@unit-testing/providers';
import { ActivatedRouteProvider } from './../../../../unit-testing/providers';
import { CompletionComponent } from './completion';

describe('Completion', () => {
  let component: CompletionComponent;
  let fixture: ComponentFixture<CompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletionComponent],
      providers: [
        ActivatedRouteProvider,
        provideOnboardingFacade({
          account$$: jest
            .fn()
            .mockImplementation(() => accountResponseWithAdminUserMock),
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
