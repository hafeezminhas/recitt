import { AccountService } from '@features/account/account.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class AccountExistsGuard implements CanActivate {
  constructor(private readonly accountService: AccountService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const accountId = request.params.accountId || request.body.accountId;

    if (!accountId) {
      throw new NotFoundException('Account ID is required.');
    }

    const account = await this.accountService.findById(accountId);

    if (!account) {
      throw new NotFoundException('Account not found.');
    }

    request.account = account;

    return true;
  }
}
