import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from '@database/entities/user.entity';
import { UserRepository } from '@database/repositories/user.repository';
import { JwtService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@common/strategies/local.strategy';
import { JwtStrategy } from '@common/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
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
