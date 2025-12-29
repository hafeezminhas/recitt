import { Account } from '@database/entities/account.entity';
import { Billing } from '@database/entities/billing.entity';
import { Note } from '@database/entities/note.entity';
import { User } from '@database/entities/user.entity';
import { AccountRepository } from '@database/repositories/account.repository';
import { BillingRepository } from '@database/repositories/billing.repository';
import { UserRepository } from '@database/repositories/user.repository';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@shared/services/jwt.service';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([Account, Billing, Note, User]),
  ],
  controllers: [AccountController],
  providers: [
    JwtService,
    AccountService,
    AccountRepository,
    BillingRepository,
    UserRepository,
  ],
})
export class AccountModule {}
