import { Account } from '@database/entities/account.entity';
import { AccountRepository } from '@database/repositories/account.repository';
import { BillingRepository } from '@database/repositories/billing.repository';
import { UserRepository } from '@database/repositories/user.repository';
import {
  AccountResponseDto,
  AddAccountAdminUserDto,
  AddBillingInfoDto,
  CreateAccountDto,
  OnboardingStatusPayloadDto,
} from '@dto/account.dto';
import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { IAddress, UserRole } from '@recitt/types';
import { JwtService } from '@shared/services/jwt.service';
import { createHmac } from 'node:crypto';
import { AccountMapper } from './account.mapper';

const { ACCOUNT_ONBOARDING_SECRET } = process.env;

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly accountRepo: AccountRepository,
    private readonly billingRepo: BillingRepository,
    private readonly JwtService: JwtService,
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
    return this.accountRepo.findById(id, [
      'billingInformation',
      'accountAdmin',
    ]);
  }

  async create(payload: CreateAccountDto): Promise<AccountResponseDto> {
    try {
      const account = await this.accountRepo.create(payload);
      this.logger.log(`Account created with id = ${account.id}`);

      const onboardingLink = this.generateOnboardingLink(account.id);
      this.logger.log(`Onboarding link generated: ${onboardingLink}`);

      // this.sendWelcomeEmail(onboardingLink, account);
      return AccountMapper.toResponseDto(account);
    } catch (err) {
      this.logger.error('Error in creating account', err.message);
      throw new InternalServerErrorException('Failed to create account', {
        cause: err,
      });
    }
  }

  async addBillingInfo(
    payload: AddBillingInfoDto
  ): Promise<AccountResponseDto> {
    try {
      const { accountId, ...billingPayload } = payload;
      const billingInfo = await this.billingRepo.create({
        ...billingPayload,
        account: { id: accountId },
      });
      // TODO: run payment via prefered payment method
      // TODO: update payment status in billing info
      if (!billingInfo) {
        this.logger.error('Error in adding billing info');
        throw new InternalServerErrorException('Billing info not created');
      }
      this.logger.log(`Billing info created with id=${billingInfo.id}`);

      return AccountMapper.toResponseDto(
        await this.accountRepo.findById(accountId, ['billingInformation'])
      );
    } catch (err) {
      this.logger.error('Error in adding billing info', err.message);
      throw new InternalServerErrorException('Failed to add billing info', {
        cause: err,
      });
    }
  }

  async addAccountAdminUser(
    accountId: string,
    address: IAddress,
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

      const account = await this.accountRepo.findById(accountId, [
        'billingInformation',
        'accountAdmin',
      ]);

      const activationJwt = await this.JwtService.createUserAccountActivation(
        accountId
      );
      const activationLink = `http://localhost:4200/customer-activation/${activationJwt}`;
      this.logger.log(`Activation link= ${activationLink}`);

      // await this.mailerService.sendMail({
      //   to: adminUser.email,
      //   subject: 'Activate Your Account',
      //   template: './account-activation', // Assuming a template exists
      //   context: {
      //     companyName: account.name,
      //     activationLink,
      //   },
      // });

      return account;
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
  }: OnboardingStatusPayloadDto) {
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

  async activateAccount(account: Account) {
    try {
      await this.userRepo.update(account.accountAdmin.id, {
        accountActivated: true,
      });

      await this.accountRepo.update(account.id, { isActive: true });
      return {
        success: true,
        message: 'Your account has been activated successfully.',
      };
    } catch (err) {
      this.logger.error('Error activating account', err.message);
      throw new InternalServerErrorException('Failed to activate account');
    }
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
