import { Account } from '@database/entities/account.entity';
import { AccountRepository } from '@database/repositories/account.repository';
import { BillingRepository } from '@database/repositories/billing.repository';
import { UserRepository } from '@database/repositories/user.repository';
import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AddAccountAdminUserDto,
  AddBillingInfoDto,
  Address,
  CreateAccountDto,
  OnboardingStatusPayload,
  UserRole,
} from '@recitt/types';
import { createHmac } from 'node:crypto';

const { ACCOUNT_ONBOARDING_SECRET, ACCOUNT_ONBOARDING_EXPIRY } = process.env;

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly accountRepo: AccountRepository,
    private readonly billingRepo: BillingRepository,
    private readonly userRepo: UserRepository
  ) {}

  async findAccount(
    filterQuery: Partial<
      Pick<
        CreateAccountDto,
        'name' | 'email' | 'registrationNumber' | 'vatNumber'
      >
    >
  ) {
    return this.accountRepo.findOne({
      where: Object.keys(filterQuery).map((key) => ({
        [key]: filterQuery[key],
      })),
    });
  }

  async findById(id: string) {
    return this.accountRepo.findById(id);
  }

  async create(payload: CreateAccountDto) {
    try {
      const account = await this.accountRepo.create(payload);
      this.logger.log(`Account created with id = ${account.id}`);

      const onboardingLink = this.generateOnboardingLink(account.id);
      this.logger.log(`Onboarding link generated: ${onboardingLink}`);

      this.sendWelcomeEmail(onboardingLink, account);
      return account;
    } catch (err) {
      this.logger.error('Error in creating account', err.message);
      throw new InternalServerErrorException('Failed to create account', {
        cause: err,
      });
    }
  }

  async addBillingInfo(accountId: string, payload: AddBillingInfoDto) {
    try {
      const { accountId, ...billingPayload } = payload;
      const billingInfo = await this.billingRepo.create({
        ...billingPayload,
        account: { id: accountId },
      });
      // TODO: run payment via prefered payment method
      // TODO: update payment status in billing info
      if (!billingInfo) {
        throw new InternalServerErrorException('Billing info not created');
      }
      this.logger.log(`Billing info created with id=${billingInfo.id}`);

      return await this.accountRepo.findById(accountId, ['billingInformation']);
    } catch (err) {
      this.logger.error('Error in adding billing info', err.message);
      throw new InternalServerErrorException('Failed to add billing info', {
        cause: err,
      });
    }
  }

  async addAccountAdminUser(
    accountId: string,
    address: Address,
    payload: Omit<AddAccountAdminUserDto, 'accountId'>
  ) {
    try {
      const adminUser = await this.userRepo.create({
        ...payload,
        address: address,
        role: UserRole.ACCOUNT_ADMIN,
        administeredAccount: { id: accountId },
      });
      this.logger.log(`Admin user created with id=${adminUser.id}`);
      if (!adminUser) {
        throw new InternalServerErrorException('Admin user not created');
      }
      // update admin user in account
      await this.accountRepo.update(accountId, {
        accountAdmin: adminUser,
      });
      return await this.accountRepo.findById(accountId, [
        'billingInformation',
        'accountAdmin',
      ]);
    } catch (err) {
      this.logger.error('Error in creating new user', err.message);
      throw new InternalServerErrorException('Failed to create new user', {
        cause: err,
      });
    }
  }

  async getOnboardingStatus({
    accountId,
    expires,
    token,
  }: OnboardingStatusPayload) {
    const isTokenVerified = this.verifyOnboardingLink(
      accountId,
      expires,
      token
    );
    if (!isTokenVerified) {
      throw new UnauthorizedException('Onboarding link is invalid or expired');
    }

    return this.accountRepo.findById(accountId, [
      'accountAdmin',
      'billingInformation',
    ]);
  }

  private verifyOnboardingLink(
    accountId: string,
    expires: string,
    incomingToken: string
  ): boolean {
    // 1. Check if expired
    if (Date.now() > parseInt(expires)) return false;

    // 2. Re-calculate the signature
    const expectedData = `${accountId}:${expires}`;
    const expectedSignature = createHmac('sha256', ACCOUNT_ONBOARDING_SECRET)
      .update(expectedData)
      .digest('hex');

    // 3. Compare (Use timingSafeEqual for maximum security)
    return incomingToken === expectedSignature;
  }

  private generateOnboardingLink(accountId: string) {
    const expires = Date.now() + 3600000 * 24; // 24 hours from now
    // Create a string to sign
    const dataToSign = `${accountId}:${expires}`;
    // Generate HMAC hash
    const signedUrlSignature = createHmac('sha256', ACCOUNT_ONBOARDING_SECRET)
      .update(dataToSign)
      .digest('hex');

    // return `https://recitt.co.uk/complete?id=${accountId}&expires=${expires}&token=${signedUrlSignature}`;
    return `http://localhost:4200/complete?id=${accountId}&expires=${expires}&token=${signedUrlSignature}`;
  }

  private async sendWelcomeEmail(onboardingLink: string, account: Account) {
    await this.mailerService.sendMail({
      to: account.email,
      subject: 'Welcome to Recitt!',
      template: './onboarding-start', // The name of the template file
      context: {
        companyName: account.name,
        onboardingLink,
      },
    });
  }
}
