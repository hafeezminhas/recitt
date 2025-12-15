import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { CreateAccountDto } from '@recitt/types';
import { Strategy } from 'passport-local';

@Injectable()
export class NoDuplicateStrategy extends PassportStrategy(Strategy, 'account') {
  private readonly logger = new Logger(NoDuplicateStrategy.name);

  constructor() {
    super();
  }

  async validate(payload: CreateAccountDto): Promise<CreateAccountDto> {
    // const body = (req as any).body;
    // const body = payload;
    console.log('payload body', payload);

    // const exists = await qb.getOne();
    // if (exists) {
    //   throw new BadRequestException(
    //     `Duplicate account exists with one of these fields: name, registrationNumber, vatNumber, email, phone`
    //   );
    // }
    // // Valid → return true OR the body
    return { ...payload };
  }
}
