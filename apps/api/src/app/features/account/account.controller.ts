import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Request } from 'express';

import {
  AddAccountAdminUserDto,
  AddBillingInfoDto,
  CreateAccountDto,
  OnboardingStatusPayloadDto,
} from '@dto/account.dto';
import { AccountActivationDto } from '@dto/user.dto';
import { JwtService } from '@shared/services/jwt.service';
import { jwtTimeToSeconds } from '@shared/utils';
import { AccountService } from './account.service';
import { AddBillingInfoSwagger, CreateAccountSwagger } from './account.swagger';
import {
  AccountActivateGuard,
  AccountExistsGuard,
  OnboardingCookieGuard,
  UniqueAccountGuard,
} from './guards';

const { ACCOUNT_ONBOARDING_COOKIE, ACCOUNT_ONBOARDING_EXPIRY } = process.env;

@Controller('accounts')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService
  ) {}

  @UseGuards(OnboardingCookieGuard)
  @Get()
  async getOnboardingOnLoad(@Req() request: Request) {
    return request.accountId
      ? this.accountService.findById(request.accountId)
      : null;
  }

  @UseGuards(UniqueAccountGuard)
  @Post()
  @ApiBody({ type: CreateAccountDto })
  @CreateAccountSwagger.ApiOperation
  @CreateAccountSwagger.ApiResponseSuccess
  @CreateAccountSwagger.ApiResponseError
  async createAccount(
    @Body() payload: CreateAccountDto,
    @Res({ passthrough: true }) res
  ) {
    const account = await this.accountService.create(payload);
    const token = await this.jwtService.createAccountOnboarding(account.id);
    const maxAge = jwtTimeToSeconds(ACCOUNT_ONBOARDING_EXPIRY) * 1000;
    res.cookie(ACCOUNT_ONBOARDING_COOKIE, token, {
      maxAge,
      httpOnly: true,
      secure: true,
    });
    return account;
  }

  @UseGuards(AccountExistsGuard)
  @Post('billing')
  @ApiBody({ type: AddBillingInfoDto })
  @AddBillingInfoSwagger.ApiOperation
  @AddBillingInfoSwagger.ApiResponseSuccess
  @AddBillingInfoSwagger.ApiResponseError
  addBillingInfo(@Body() payload: AddBillingInfoDto) {
    return this.accountService.addBillingInfo(payload);
  }

  @UseGuards(AccountExistsGuard)
  @Post('admin')
  @ApiBody({ type: AddAccountAdminUserDto })
  addAccountAdminUser(
    @Req() request: Request,
    @Res({ passthrough: true }) res,
    @Body() payload: AddAccountAdminUserDto
  ) {
    const { id, address } = request.account;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accountId, ...rest } = payload;
    res.clearCookie(ACCOUNT_ONBOARDING_COOKIE);
    return this.accountService.addAccountAdminUser(id, address, rest);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.accountService.findById(id);
  }

  @Post('onboarding-status')
  getOnboardingStatus(@Body() payload: OnboardingStatusPayloadDto) {
    return this.accountService.getOnboardingStatus(payload);
  }

  @UseGuards(AccountActivateGuard)
  @Post('activate-account')
  @ApiBody({ type: AccountActivationDto })
  activateAccount(@Req() request: Request) {
    return this.accountService.activateAccount(request.account);
  }
}
