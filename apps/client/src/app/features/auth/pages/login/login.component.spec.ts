import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
} from '@coreui/angular';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { AuthFacade } from '@features/auth/+state/auth.facade';
import { iconSubset } from '@icons/icon-subset';
import { provideAuthFacade } from '@unit-testing/providers';
import { MockFacade } from '@unit-testing/types';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let iconSetService: IconSetService;
  let authFacade: MockFacade<AuthFacade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormModule,
        CardModule,
        GridModule,
        ButtonModule,
        IconModule,
        LoginComponent,
      ],
      providers: [IconSetService, provideAuthFacade()],
    }).compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    authFacade = TestBed.inject(AuthFacade) as MockFacade<AuthFacade>;

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
      it('should call authFacade.login with form values when form is valid', () => {
        const credentials = { username: 'testuser', password: 'testpass' };
        component.loginForm.setValue(credentials);

        component.onSubmit();

        expect(authFacade.login).toHaveBeenCalledWith(credentials);
      });
    });
    describe('And login fail due to invalid password', () => {
      it('should not call authFacade.login when form is invalid', () => {
        component.loginForm.setValue({ username: 'testuser', password: '' });

        component.onSubmit();

        expect(authFacade.login).not.toHaveBeenCalled();
      });
    });
  });
});
