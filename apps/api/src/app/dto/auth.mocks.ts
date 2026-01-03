import {
  CredentialsDto,
  PasswordResetDto,
  RequestPasswordResetDto,
} from './user.dto';

/**
 * Mock Data for Auth DTOs
 */
export const sampleLoginPayload: CredentialsDto = {
  username: 'user@example.com',
  password: 'password123',
};

// export const sampleLoginResponse:

export const samplePasswordResetRequestPayload: RequestPasswordResetDto = {
  email: 'user@example.com',
};

export const samplePasswordResetPayload: PasswordResetDto = {
  token: 'reset-token-123',
  password: 'newpassword123',
  confirmation: 'newpassword123',
};
