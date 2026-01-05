import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ApiError, ICredentials, IUserProfile } from '@recitt/types';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    /* Login */
    Login: props<{ credentials: ICredentials }>(),
    'Login Success': props<{ token: string }>(),
    'Login Failure': props<{ error: ApiError }>(),

    /* User Profile */
    'Load User Profile': emptyProps(),
    'Load User Profile Success': props<{ user: IUserProfile }>(),
    'Load User Profile Failure': props<{ error: ApiError }>(),

    /* Request Password Reset */
    'Request Password Reset': props<{ email: string }>(),
    'Request Password Reset Success': emptyProps(),
    'Request Password Reset Failure': props<{ error: string }>(),

    /* Reset Password */
    'Reset Password': props<{ token: string; newPassword: string }>(),
    'Reset Password Success': emptyProps(),
    'Reset Password Failure': props<{ error: string }>(),

    /* Optional but common */
    Logout: emptyProps(),
  },
});
