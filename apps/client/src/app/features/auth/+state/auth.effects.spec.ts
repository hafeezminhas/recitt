import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { ApiError, ICredentials } from '@recitt/types';
import { userProfileMock } from '@unit-testing/fixtures/auth.mock';
import { authServiceMock } from '@unit-testing/mocks';
import { RouterProvider } from '@unit-testing/providers';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { AuthActions } from './auth.actions';
import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let actions$: Observable<Action>;
  let effects: AuthEffects;
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        RouterProvider,
      ],
    });

    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login$', () => {
    //  Success login path
    it('should dispatch loginSuccess on successful login', (done) => {
      const credentials: ICredentials = {
        username: 'a@test.com',
        password: '1234',
      };
      const response = { apiKey: 'token-123' };

      authService.login.mockReturnValue(of(response));

      actions$ = of(AuthActions.login({ credentials }));

      effects.login$.subscribe((action) => {
        expect(action).toEqual(
          AuthActions.loginSuccess({ token: 'token-123' })
        );
        expect(authService.login).toHaveBeenCalledWith(credentials);
        done();
      });
    });

    // Failed login path
    it('should dispatch loginFailure on error', (done) => {
      const credentials = { username: 'a@test.com', password: '1234' };
      const error: ApiError = {
        message: 'Unauthorized',
        error: 'Unknown error occurred',
        statusCode: 401,
      };

      authService.login.mockReturnValue(throwError(() => error));

      actions$ = of(AuthActions.login({ credentials }));

      effects.login$.subscribe((action) => {
        expect(action).toEqual(AuthActions.loginFailure({ error }));
        done();
      });
    });
  });

  describe('loadUserProfile$', () => {
    it('should dispatch loadUserProfileSuccess on success', (done) => {
      authService.getProfile.mockReturnValue(of(userProfileMock));

      actions$ = of(AuthActions.loadUserProfile());

      effects.loadUserProfile$.subscribe((action) => {
        expect(action).toEqual(
          AuthActions.loadUserProfileSuccess({ user: userProfileMock })
        );
        done();
      });
    });

    it('should dispatch loadUserProfileFailure on error', (done) => {
      const error: ApiError = {
        message: 'Profile error',
        error: 'Unknown error occurred',
        statusCode: 500,
      };

      authService.getProfile.mockReturnValue(throwError(() => error));

      actions$ = of(AuthActions.loadUserProfile());

      effects.loadUserProfile$.subscribe((action) => {
        expect(action).toEqual(AuthActions.loadUserProfileFailure({ error }));
        done();
      });
    });

    describe('logout$', () => {
      it('should remove apiKey and navigate to signin', (done) => {
        const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

        actions$ = of(AuthActions.logout());

        effects.logout$.subscribe(() => {
          expect(removeItemSpy).toHaveBeenCalledWith(environment.authKey);
          expect(router.navigate).toHaveBeenCalledWith(['signin']);
          done();
        });
      });
    });
  });
});
