import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideAnimations } from '@angular/platform-browser/animations';
import {
  AlertComponent,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
} from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { AuthFacade } from '@features/auth/+state/auth.facade';
import { iconSubset } from '@icons/icon-subset';
import { createAuthFacadeMock } from '@unit-testing/mocks';
import { LoginComponent } from './login.component';

const authFacadeMock = createAuthFacadeMock();
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormModule,
        CardModule,
        GridModule,
        ButtonModule,
        IconModule,
        AlertComponent,
        LoginComponent,
      ],
      providers: [
        provideAnimations(),
        IconSetService,
        {
          provide: AuthFacade,
          useValue: authFacadeMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When login form is submitted', () => {
    describe('And login is successful', () => {
      const credentials = {
        username: 'testuser@example.com',
        password: 'testpass',
      };
      let loginSpy: jest.SpyInstance;

      beforeEach(() => {
        loginSpy = jest.spyOn(authFacadeMock, 'login');
        component.loginForm.patchValue(credentials);
        component.onSubmit();
      });

      it('should call authFacade.login with form values when form is valid', () => {
        expect(loginSpy).toHaveBeenCalledWith(credentials);
      });
    });

    // describe('And login fail due to invalid password', () => {
    //   beforeEach(() => {
    //     component.loginForm.patchValue({
    //       username: 'testuser@example.com',
    //       password: '',
    //     });

    //     component.onSubmit();
    //   });
    //   it('should not call authFacade.login when form is invalid', () => {
    //     expect(authFacade.login).not.toHaveBeenCalled();
    //   });
    // });
  });
});
