import { Address } from '@recitt/types';

export type JwtPayload = {
  sub: string; // userId
  typ: 'jwt';
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  address: Address;
  role: string;
};
