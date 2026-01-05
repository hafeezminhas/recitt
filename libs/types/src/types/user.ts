import { UserRole } from '../enums/roles.enum';

export interface ICredentials {
  username: string;
  password: string;
}

export interface ISigninResponse {
  apiKey: string;
}

export interface IRequestPasswordReset {
  email: string;
}

export interface IPasswordReset {
  token: string;
  password: string;
  confirmation: string;
}

export interface IUserProfile {
  firstName: string;
  middleName: string;
  lastName: string;
  displayName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  accountActivated: boolean;
  avatar: string;
  role: UserRole;
  isDefaultAvatar: boolean;
}
