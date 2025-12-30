import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class OnboardingCookieGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { ACCOUNT_ONBOARDING_COOKIE, ACCOUNT_ONBOARDING_SECRET } =
      process.env;

    const onboardingCookie = request.cookies?.[ACCOUNT_ONBOARDING_COOKIE];
    console.log('onboardingToken', onboardingCookie);

    if (!onboardingCookie) {
      request.accountId = null;
      return true;
    }

    try {
      const { sub } = jwt.verify(onboardingCookie, ACCOUNT_ONBOARDING_SECRET);
      if (sub) {
        request.accountId = sub;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      request.accountId = null;
    }

    return true;
  }
}
