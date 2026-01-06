import { ApiError, IUserProfile } from '@recitt/types';
import { userProfileMock } from '@unit-testing/fixtures/auth.mock';
import * as AuthSelectors from './auth.selectors';
import { AuthState } from './auth.state';

describe('Auth Selectors', () => {
  const initialAuthState: AuthState = {
    user: null,
    apiKey: null,
    loading: false,
    error: null,
  };

  describe('When isAuthLoading is executed', () => {
    let result: boolean;

    beforeEach(() => {
      result = AuthSelectors.isAuthLoading.projector({
        ...initialAuthState,
        loading: true,
      });
    });

    it('should return loading flag', () => {
      expect(result).toBe(true);
    });
  });

  describe('When apiKey is executed', () => {
    let result: string | null;

    beforeEach(() => {
      result = AuthSelectors.apiKey.projector({
        ...initialAuthState,
        apiKey: 'test-api-key',
      });
    });

    it('should return apiKey from state', () => {
      expect(result).toBe('test-api-key');
    });
  });

  describe('When authUser is executed', () => {
    let result: IUserProfile | null;

    describe('when user is present', () => {
      beforeEach(() => {
        result = AuthSelectors.authUser.projector({
          ...initialAuthState,
          user: userProfileMock,
        });
      });

      it('should return user', () => {
        expect(result).toEqual(userProfileMock);
      });
    });

    describe('when no user', () => {
      beforeEach(() => {
        result = AuthSelectors.authUser.projector(initialAuthState);
      });

      it('should return null', () => {
        expect(result).toBeNull();
      });
    });
  });

  describe('When authError is executed', () => {
    let result: ApiError | null;
    const error: ApiError = {
      message: 'Unauthorized',
      error: 'Unknown error occurred',
      statusCode: 401,
    };

    describe('when error is present', () => {
      beforeEach(() => {
        result = AuthSelectors.authError.projector({
          ...initialAuthState,
          error,
        });
      });

      it('should return error', () => {
        expect(result).toEqual(error);
      });
    });

    describe('when no error', () => {
      beforeEach(() => {
        result = AuthSelectors.authError.projector(initialAuthState);
      });

      it('should return null', () => {
        expect(result).toBeNull();
      });
    });
  });
});
