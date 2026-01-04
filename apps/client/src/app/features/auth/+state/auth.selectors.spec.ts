import { ApiError } from '@recitt/types';
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

  describe('selectIsAuthLoading', () => {
    it('should return loading flag', () => {
      const result = AuthSelectors.isAuthLoading.projector({
        ...initialAuthState,
        loading: true,
      });

      expect(result).toBe(true);
    });
  });

  describe('selectApiKey', () => {
    it('should return apiKey from state', () => {
      const result = AuthSelectors.apiKey.projector({
        ...initialAuthState,
        apiKey: 'test-api-key',
      });

      expect(result).toBe('test-api-key');
    });
  });

  describe('selectAuthUser', () => {
    it('should return user when present', () => {
      const result = AuthSelectors.authUser.projector({
        ...initialAuthState,
        user: userProfileMock,
      });

      expect(result).toEqual(userProfileMock);
    });

    it('should return null when no user', () => {
      const result = AuthSelectors.authUser.projector(initialAuthState);

      expect(result).toBeNull();
    });
  });

  describe('selectAuthError', () => {
    it('should return error when present', () => {
      const error: ApiError = {
        message: 'Unauthorized',
        error: 'Unknown error occurred',
        statusCode: 401,
      };

      const result = AuthSelectors.authError.projector({
        ...initialAuthState,
        error,
      });

      expect(result).toEqual(error);
    });

    it('should return null when no error', () => {
      const result = AuthSelectors.authError.projector(initialAuthState);

      expect(result).toBeNull();
    });
  });
});
