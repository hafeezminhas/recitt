import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '@shared/jwt-payload';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate({
    sub,
    firstName,
    middleName,
    lastName,
    email,
    role,
  }: JwtPayload) {
    return {
      sub,
      name: `${firstName} ${lastName}`,
      firstName,
      middleName,
      lastName,
      email,
      role,
    };
  }
}
