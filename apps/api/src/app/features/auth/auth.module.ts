import { JwtStrategy } from '@common/strategies/jwt.strategy';
import { LocalStrategy } from '@common/strategies/local.strategy';
import { User } from '@database/entities/user.entity';
import { UserRepository } from '@database/repositories/user.repository';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@shared/services/jwt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({}),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [
    JwtService,
    AuthService,
    UserRepository,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [],
})
export class AuthModule {}
