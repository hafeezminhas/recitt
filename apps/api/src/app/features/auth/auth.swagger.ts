import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export const SignupSwagger = {
  ApiOperation: ApiOperation({ summary: 'Signup new user' }),
  ApiResponseSuccess: ApiResponse({
    status: 201,
    description:
      'User signup successful. Please check your email to verify your account!',
  }),
  ApiResponseError: ApiResponse({
    status: 400,
    description: 'Validation Error!',
  }),
};

export const SigninSwagger = {
  ApiOperation: ApiOperation({ summary: 'Signin an existing user!' }),
  ApiResponseSuccess: ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
  }),
  ApiResponseUnauthorized: ApiResponse({
    status: 401,
    description: 'Invalid username or password.',
  }),
  ApiResponseError: ApiResponse({
    status: 400,
    description: 'Validation Error',
  }),
};

export const forgotPasswordSwagger = {
  ApiOperation: ApiOperation({ summary: 'OTP for forget password' }),
  ApiResponseSuccess: ApiResponse({
    status: 200,
    description: 'OTP sent to your email.',
  }),
  ApiResponseError: ApiResponse({
    status: 400,
    description: 'Invalid email provided.',
  }),
};

export const ResetPasswordSwagger = {
  ApiResponseSuccess: ApiResponse({
    status: 200,
    description: 'Password reset successfully.',
  }),
  ApiResponseUnauthorized: ApiResponse({
    status: 401,
    description: 'Activation Key not found.',
  }),
  ApiResponseError: ApiResponse({
    status: 400,
    description: 'Failed to reset password.',
  }),
};
