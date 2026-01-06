import { ApiError } from '@recitt/types';
import { AuthActions } from './auth.actions';
import { authReducer, AuthState, initialState } from './auth.state';

describe('AuthReducer', () => {
  let state: AuthState;

  beforeEach(() => {
    state = { ...initialState };
  });

  describe('Login', () => {
    it('should set loading true and clear error on login', () => {
      const action = AuthActions.login;

      const result = authReducer(state, action);

      expect(result).toEqual({
        ...state,
        loading: true,
        error: null,
      });
    });
  });

  describe('loginSuccess', () => {
    it('should set apiKey and stop loading', () => {
      const action = AuthActions.loginSuccess({
        token: 'test-api-key',
      });

      const result = authReducer({ ...state, loading: true }, action);

      expect(result).toEqual({
        ...state,
        apiKey: 'test-api-key',
        loading: false,
      });
    });
  });

  describe('loginFailure', () => {
    it('should set error and stop loading', () => {
      const error: ApiError = {
        message: 'Invalid credentials',
        error: 'Unknown error occurred',
        statusCode: 401,
      };

      const action = AuthActions.loginFailure({ error });

      const result = authReducer({ ...state, loading: true }, action);

      expect(result).toEqual({
        ...state,
        error,
        loading: false,
      });
    });
  });
});
