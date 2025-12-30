import { AccountActivationDto } from '@dto/user.dto';
import { AccountService } from '@features/account/account.service';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  GoneException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@shared/services/jwt.service';

@Injectable()
export class AccountActivateGuard implements CanActivate {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { ACCOUNT_ACTIVATION_SECRET } = process.env;
    const request = context.switchToHttp().getRequest();
    const body: AccountActivationDto = request.body;

    const { activationKey } = body;

    const activationExpird = await this.jwtService.isTokenExpired(
      activationKey
    );
    if (activationExpird) {
      console.error(
        'Activation key has expired, please try signing in and request new activation.'
      );
      throw new GoneException(
        'Activation key has expired, please try signing in and request new activation.'
      );
    }

    try {
      const payload = await this.jwtService.verifyJwtAccessToken(
        activationKey,
        ACCOUNT_ACTIVATION_SECRET
      );

      console.log(payload);

      const account = await this.accountService.findById(payload.sub);

      if (!account) {
        throw new BadRequestException('Invaild account activation key.');
      }
      request.account = account;

      return true;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid activation key provided.');
    }
  }
}
