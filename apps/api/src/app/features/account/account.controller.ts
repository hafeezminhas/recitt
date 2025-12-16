import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Request } from 'express';

import { AccountExistsGuard } from '@common/guards/account-exist.guard';
import { UniqueAccountGuard } from '@common/guards/unique-account.guards';
import {
  AddAccountAdminUserDto,
  AddBillingInfoDto,
  CreateAccountDto,
  OnboardingStatusPayload,
} from '@recitt/types';
import { AccountService } from './account.service';
import { AddBillibgInfoSwagger, CreateAccountSwagger } from './account.swagger';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('onboarding-status')
  getOnboardingStatus(@Body() payload: OnboardingStatusPayload) {
    return this.accountService.getOnboardingStatus(payload);
  }

  @UseGuards(UniqueAccountGuard)
  @Post()
  @ApiBody({ type: CreateAccountDto })
  @CreateAccountSwagger.ApiOperation
  @CreateAccountSwagger.ApiResponseSuccess
  @CreateAccountSwagger.ApiResponseError
  createAccount(@Body() payload: CreateAccountDto) {
    return this.accountService.create(payload);
  }

  @UseGuards(AccountExistsGuard)
  @Post('billing')
  @ApiBody({ type: AddBillingInfoDto })
  @AddBillibgInfoSwagger.ApiOperation
  @AddBillibgInfoSwagger.ApiResponseSuccess
  @AddBillibgInfoSwagger.ApiResponseError
  addBillingInfo(@Req() request: Request, @Body() payload: AddBillingInfoDto) {
    return this.accountService.addBillingInfo(request.account.id, payload);
  }

  @UseGuards(AccountExistsGuard)
  @Post('admin')
  @ApiBody({ type: AddAccountAdminUserDto })
  addAccountAdminUser(
    @Req() request: Request,
    @Body() payload: AddAccountAdminUserDto
  ) {
    const { id, address } = request.account;
    const { accountId, ...rest } = payload;
    return this.accountService.addAccountAdminUser(id, address, rest);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.accountService.findById(id);
  }
}
