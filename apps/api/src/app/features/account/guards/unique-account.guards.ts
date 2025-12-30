import { CreateAccountDto } from '@dto/account.dto';
import { AccountService } from '@features/account/account.service';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class UniqueAccountGuard implements CanActivate {
  constructor(private readonly accountService: AccountService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const body: CreateAccountDto = request.body;

    const { name, email, registrationNumber, vatNumber } = body;

    const existing = await this.accountService.findAccount({
      name,
      email,
      registrationNumber,
      vatNumber,
    });

    if (existing) {
      throw new BadRequestException(
        'An account with matching details already exists.'
      );
    }

    return true;
  }
}
