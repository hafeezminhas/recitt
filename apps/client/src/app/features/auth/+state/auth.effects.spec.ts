import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { ApiError, ICredentials } from '@recitt/types';
import { userProfileMock } from '@unit-testing/fixtures/auth.mock';
import { authServiceMock } from '@unit-testing/mocks';
import { provideAuthFacade, RouterProvider } from '@unit-testing/providers';
import { Observable, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { AuthActions } from './auth.actions';
import { AuthEffects } from './auth.effects';

describe('AuthEffects:', () => {
  let actions$: Observable<Action>;
  let effects: AuthEffects;
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
        provideAuthFacade(),
        RouterProvider,
      ],
    });

    effects = TestBed.inject(AuthEffects);
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When login action triggers its effect', () => {
    describe('And login is successful', () => {
      const credentials: ICredentials = {
        username: 'a@test.com',
        password: '1234',
      };
      beforeEach(() => {
        const response = { apiKey: 'token-123' };

        authServiceMock.login.mockReturnValue(of(response));

        actions$ = of(AuthActions.login({ credentials }));

        effects.login$.subscribe((action) => {
          expect(action).toEqual(
            AuthActions.loginSuccess({ token: 'token-123' })
          );
        });
      });
      it('should dispatch loginSuccess on successful login', (done) => {
        expect(authServiceMock.login).toHaveBeenCalledWith(credentials);
        done();
      });
    });

    describe('And login fails', () => {
      const credentials = { username: 'a@test.com', password: '1234' };
      const error: ApiError = {
        message: 'Unauthorized',
        error: 'Unknown error occurred',
        statusCode: 401,
      };

      beforeEach(() => {
        authServiceMock.login.mockReturnValue(
          throwError(() => ({ error } as HttpErrorResponse))
        );

        actions$ = of(AuthActions.login({ credentials }));
      });
      it('should dispatch loginFailure on error', (done) => {
        effects.login$.subscribe((action) => {
          expect(action).toEqual(AuthActions.loginFailure({ error }));
          done();
        });
      });
    });
  });

  describe('When loadUserProfile action triggers its effect', () => {
    describe('And user profile load is succssfull', () => {
      beforeEach(() => {
        authServiceMock.getProfile.mockReturnValue(of(userProfileMock));

        actions$ = of(AuthActions.loadUserProfile());
      });

      it('should dispatch loadUserProfileSuccess on success', (done) => {
        effects.loadUserProfile$.subscribe((action) => {
          expect(action).toEqual(
            AuthActions.loadUserProfileSuccess({ user: userProfileMock })
          );
          done();
        });
      });
    });

    describe('And user profile load fails', () => {
      const error: ApiError = {
        message: 'Profile error',
        error: 'Unknown error occurred',
        statusCode: 500,
      };

      beforeEach(() => {
        authServiceMock.getProfile.mockReturnValue(throwError(() => error));

        actions$ = of(AuthActions.loadUserProfile());
      });

      it('should dispatch loadUserProfileFailure on error', (done) => {
        effects.loadUserProfile$.pipe(take(1)).subscribe((action) => {
          expect(action).toEqual(AuthActions.loadUserProfileFailure({ error }));
          done();
        });
      });
    });

    describe('logout$', () => {
      const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
      beforeEach(() => {
        actions$ = of(AuthActions.logout());
      });

      it('should remove apiKey and navigate to signin', (done) => {
        effects.logout$.subscribe(() => {
          expect(removeItemSpy).toHaveBeenCalledWith(environment.authKey);
          expect(router.navigate).toHaveBeenCalledWith(['signin']);
          done();
        });
      });
    });
  });
});
