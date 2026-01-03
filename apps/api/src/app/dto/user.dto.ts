import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IAccountActivationPayload,
  IAddress,
  ICredentials,
  IPasswordReset,
  IRequestPasswordReset,
  ISigninResponse,
} from '@recitt/types';
import { Match } from '@shared/utils';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from './address.dto';

export interface PasswordReset {
  token?: string;
  expiresAt?: Date;
}

/**
 * UserSignupRequestDto - Used for user registration/creation
 * Only includes fields that should be provided during account creation
 */
export class UserSignupRequestDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiPropertyOptional({
    example: 'Michael',
    description: 'Middle name (optional)',
  })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiPropertyOptional({
    example: 'Johnny',
    description: 'Display name (optional)',
  })
  @IsOptional()
  @IsString()
  displayName?: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '1990-01-01', required: false })
  @IsDateString()
  dateOfBirth: string;

  @ApiProperty({ example: 'admin@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ type: AddressDto, required: false })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}

/**
 * LoginDto - Used for user authentication
 */
export class CredentialsDto implements ICredentials {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'newpassword123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class signinResponseDto implements ISigninResponse {
  @IsString()
  @IsNotEmpty()
  apiKey: string;
}

/**
 * PasswordResetRequestDto - Used to request a password reset
 */
export class RequestPasswordResetDto implements IRequestPasswordReset {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

/**
 * PasswordResetDto - Used for password reset
 */
export class PasswordResetDto implements IPasswordReset {
  @ApiProperty({ example: 'reset-token-123' })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: 'newpassword123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'newpassword123' })
  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  confirmation: string;
}

/**
 * UpdateUserDto - Used for user profile updates
 * All fields are optional since users may only update specific fields
 */
export class UpdateUserRequestDto {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  displayName?: string;
  dateOfBirth?: Date;
  phone?: string;
  address?: IAddress;
  password?: string;
  isDefaultAvatar?: boolean;
  avatar?: Buffer;
  avatarMimeType?: string;
}

/**
 * ChangePasswordDto - Used for password changes
 */
export class ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * UserResponseDto - Used for API responses
 * Excludes sensitive fields like password and includes metadata
 */
export class UserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  displayName?: string;
  dateOfBirth?: Date;
  username: string;
  email: string;
  phone?: string;
  address?: IAddress;
  role: string;
  avatar?: Buffer;
  avatarMimeType?: string;
  isDefaultAvatar?: boolean;
  accountActivated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * UserProfileDto - Detailed user profile information
 * Includes all non-sensitive user data
 */
export class UserProfileDto {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  displayName?: string;
  dateOfBirth?: Date;
  username: string;
  email: string;
  phone?: string;
  address?: IAddress;
  role: string;
  avatar?: Buffer;
  avatarMimeType?: string;
  isDefaultAvatar?: boolean;
  failedLogins: number;
  lockedUntil?: Date | null;
  accountActivated: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ForgetPasswordDto {
  @ApiProperty({ example: 'admin@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

/**
 * VerifyAccountDto - Used for account verification
 */
export class VerifyAccountDto {
  email: string;
  verificationCode: string;
}

/**
 * ResetPasswordDto - Used for password reset
 */
export class ResetPasswordDto {
  @ApiProperty({ example: 'admin@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 123456 })
  @IsNotEmpty()
  verificationCode: number;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}

/**
 * AvatarUploadDto - Used for avatar file uploads
 */
export class AvatarUploadDto {
  file: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
  };
}

/**
 * UserListResponseDto - Used for list endpoints
 * Paginated response of users
 */
export interface UserListResponseDto {
  data: UserResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export class UpdatePasswordDto {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export class AccountActivationDto implements IAccountActivationPayload {
  @IsNotEmpty()
  @IsString()
  activationKey: string;
}
