import { User } from '@database/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtSignOptions, JwtService as NestJwtService } from '@nestjs/jwt';
import { JwtPayload } from '@shared/jwt-payload';
import { jwtTimeToSeconds } from '@shared/utils';

const {
  JWT_KEY,
  JWT_SECRET,
  JWT_EXPIRATION,
  ACCOUNT_ACTIVATION_TOKEN_SECRET,
  ACCOUNT_ACTIVATION_TOKEN_EXPIRY,
  ACCOUNT_ONBOARDING_SECRET,
  ACCOUNT_ONBOARDING_EXPIRY,
} = process.env;

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  public async verifyJwtAccessToken(
    token: string,
    secret: string
  ): Promise<JwtPayload> {
    return await this.jwtService.verifyAsync<JwtPayload>(token, { secret });
  }

  public async isTokenExpired(token: string): Promise<boolean> {
    return (await this.jwtService.decode(token)).exp * 1000 < Date.now();
  }

  public async isTokenValid(token: string) {
    return await this.jwtService.decode(token);
  }

  public async creatJwtAccessToken({
    id,
    firstName,
    middleName,
    lastName,
    email,
    address,
    role,
  }: User) {
    const payload = {
      firstName,
      middleName,
      lastName,
      email,
      address,
      role,
    };

    const payloadToSign: JwtPayload = {
      sub: id,
      typ: 'jwt',
      ...payload,
    };
    const jwtSignOptions: JwtSignOptions = {
      privateKey: JWT_SECRET,
      expiresIn: jwtTimeToSeconds(JWT_EXPIRATION),
      issuer: 'Recitt API',
      audience: 'www.recitt.com',
    };
    return {
      [JWT_KEY]: await this.jwtService.signAsync(payloadToSign, jwtSignOptions),
    };
  }

  async createUserAccountActivation(email: string): Promise<string> {
    const token = await this.jwtService.signAsync(
      { sub: email, typ: 'activation' },
      {
        privateKey: ACCOUNT_ACTIVATION_TOKEN_SECRET,
        expiresIn: jwtTimeToSeconds(ACCOUNT_ACTIVATION_TOKEN_EXPIRY),
        issuer: 'Recitt API',
        audience: 'www.recitt.com',
      }
    );

    return `localhost:3000/activate-account/${token}`;
  }

  async createAccountOnboarding(accountId: string): Promise<string> {
    return await this.jwtService.signAsync(
      { sub: accountId, typ: 'onboarding' },
      {
        privateKey: ACCOUNT_ONBOARDING_SECRET,
        expiresIn: jwtTimeToSeconds(ACCOUNT_ONBOARDING_EXPIRY),
        issuer: 'Recitt API',
        audience: 'www.recitt.com',
      }
    );
  }
}
