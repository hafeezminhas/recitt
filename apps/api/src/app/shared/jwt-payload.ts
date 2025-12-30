import { IAddress } from '@recitt/types';

export type JwtPayload = {
  sub: string; // userId
  typ: 'jwt';
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  address: IAddress;
  role: string;
};
