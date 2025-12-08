import { Address } from '@database/entities/user.entity';

export type JwtPayload = {
  sub: string; // userId
  typ: 'jwt';
  firstName: string;
  middleName?: string;
  lastName: string;
  username: string;
  email: string;
  address: Address;
  role: string;
};
