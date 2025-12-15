import {
  BadRequestException,
  ConflictException,
  GoneException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import fs from 'fs';
import moment from 'moment';
import path from 'path';

import { User } from '@database/entities/user.entity';
import { UserRepository } from '@database/repositories/user.repository';
import {
  AccountActivationDto,
  ResetPasswordDto,
  UpdatePasswordDto,
  UpdateUserRequestDto,
  UserSignupRequestDto,
} from '@recitt/types';
import { JwtService } from '@shared/services/jwt.service';
import { FindOneOptions } from 'typeorm';
import { generateOTP } from './auth.utils';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly JwtService: JwtService,
    private readonly userRepo: UserRepository
  ) {}

  async signUp(
    payload: UserSignupRequestDto
  ): Promise<{ status: number; message: string; activationUrl: string }> {
    const { email, username } = payload;
    const existing = await this.userRepo.findOne({
      where: [{ email: email }, { username: username }],
    } as FindOneOptions<User>);
    if (existing) {
      throw new ConflictException(
        'User with this email or username already exists.'
      );
    }

    const avatarPath = path.join(__dirname, 'assets/avatar.jpg');
    const avatarBuffer = fs.readFileSync(avatarPath);
    const mimeType = 'image/jpeg'; // Assuming default avatar is JPEG

    const newUser = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      dateOfBirth: moment(payload.dateOfBirth).toDate(),
      username:
        payload.username ??
        `${payload.firstName.toLowerCase()}_${payload.lastName.toLowerCase()}_${moment().format(
          'YY'
        )}`,
      address: payload.address,
      phone: payload.phone,
      middleName: payload.middleName,
      displayName:
        payload.displayName ?? `${payload.firstName} ${payload.lastName}`,
      failedLogins: 0,
      password: payload.password,
      avatarMimeType: mimeType,
      avatar: avatarBuffer,
      isDefaultAvatar: true,
    };

    try {
      await this.userRepo.create(newUser);
      this.logger.log(`User ${newUser.email} created successfully`);
      const activationUrl = await this.JwtService.createUserAccountActivation(
        newUser.email
      );
      return {
        status: 201,
        message: 'Signup Successfull. Please verify your email.',
        activationUrl,
      };
    } catch (err) {
      this.logger.error(err.message);
      throw new Error(err.message);
    }
  }

  async signin(reqUser: User) {
    if (!reqUser.accountActivated) {
      throw new Error('Account is not activated');
    }
    if (reqUser.lockedUntil !== null) {
      throw new Error('Account is locked');
    }

    return await this.JwtService.creatJwtAccessToken(reqUser);
  }

  async getProfile(userEmail: string) {
    const user = await this.isValidUser(userEmail);

    const {
      firstName,
      middleName,
      lastName,
      displayName,
      email,
      phone,
      dateOfBirth,
      address,
      accountActivated,
      avatar,
      avatarMimeType,
      role,
      isDefaultAvatar,
    } = user;

    const base64Avatar = avatar ? avatar.toString('base64') : null;
    return {
      firstName,
      middleName,
      lastName,
      displayName,
      email,
      phone,
      dateOfBirth,
      address,
      accountActivated,
      avatar: base64Avatar
        ? `data:${avatarMimeType};base64,${base64Avatar}`
        : null,
      role,
      isDefaultAvatar,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'password',
        'accountActivated',
        'role',
        'avatar',
        'avatarMimeType',
        'isDefaultAvatar',
        'lockedUntil',
      ],
    });

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (user && isPasswordValid) {
      this.logger.log(`User ${user.email} validation successful`);
      delete user.password;

      return user;
    }
    return null;
  }

  async uploadAvatar(email: string, file: Express.Multer.File) {
    console.log('file : ', file);

    if (!file) {
      throw new BadRequestException('File is required');
    }
    const user = await this.isValidUser(email);

    user.avatar = file.buffer;
    user.avatarMimeType = file.mimetype;
    user.isDefaultAvatar = false;

    try {
      await this.userRepo.update(user.id, { ...user });
      return {
        message: 'Avatar uploaded successfully',
        avatar: user.avatar,
        avatarMimeType: user.avatarMimeType,
        isDefaultAvatar: user.isDefaultAvatar,
      };
    } catch (err) {
      this.logger.error('Error uploading avatar', err.message);
      throw new InternalServerErrorException('Failed to upload avatar');
    }
  }

  async updateProfile(userId: string, payLoad: UpdateUserRequestDto) {
    try {
      // console.log('update profile : ', payLoad);
      if (
        payLoad.isDefaultAvatar &&
        payLoad.isDefaultAvatar !== undefined &&
        payLoad.avatarMimeType !== undefined
      ) {
        console.log('update avatar: ', payLoad);
        const avatarPath = path.join(__dirname, 'assets/avatar.jpg');
        payLoad.avatar = fs.readFileSync(avatarPath);
        payLoad.avatarMimeType = 'image/jpeg';
        payLoad.isDefaultAvatar = true; // Reset to default avatar
      }

      const updatedUser = await this.userRepo.update(userId, { ...payLoad });
      return {
        success: true,
        message: 'Profile updated successfully',
        updatedUser,
      };
    } catch (err) {
      this.logger.error('Error updating profile', err.message);
      throw new InternalServerErrorException('Failed to update profile');
    }
  }

  async generatePasswordResetOTP(email: string) {
    const user = await this.isValidUser(email);
    const passwordReset = {
      resetOTP: generateOTP(),
      expires: moment().add(1, 'hour').toDate(),
    };
    try {
      await this.userRepo.update(user.id, { passwordReset });
      return passwordReset.resetOTP;
    } catch (err) {
      this.logger.error(
        'Error in generating password code request',
        err.message
      );
      throw new InternalServerErrorException(
        'Failed to generating password code'
      );
    }
  }

  async resetPassword(payLoad: ResetPasswordDto) {
    const user = await this.isValidUser(payLoad.email);

    if (user.passwordReset !== undefined) {
      const isOTPExpired = moment(user.passwordReset.expires).isBefore(
        moment()
      );
      if (isOTPExpired) {
        throw new GoneException(
          'Your password rest code has expired, please request a new one.'
        );
      } else {
        try {
          await this.userRepo.update(user.id, {
            password: payLoad.password,
            passwordReset: null,
          });
          return { success: true, message: 'Password reset successful' };
        } catch (err) {
          this.logger.error('Error resetting password', err.message);
          throw new InternalServerErrorException('Failed to reset password');
        }
      }
    } else {
      throw new UnauthorizedException('Invalid password reset request');
    }
  }

  async updatePassword(email: string, payLoad: UpdatePasswordDto) {
    const user = await this.isValidUser(email);
    // console.log(user.password, payLoad);
    const userPassword = user.password ? user.password.trim() : '';
    const isPasswordValid = bcrypt.compareSync(payLoad.password, userPassword);
    // console.log('isPasswordValid', isPasswordValid);

    if (user && isPasswordValid) {
      // try {
      //     await this.userRepo.update(user.id, { password: payLoad.newPassword ,   $push: { oldPasswords: payLoad.password }, });
      //     this.logger.log(`User ${user.email} , Password updated successful`);
      //     return { success: true, message: 'Password updated successful' };
      //   } catch (err) {
      //     this.logger.error('Error updated password', err.message);
      //     throw new InternalServerErrorException('Failed to updated password');
      //   }
    } else {
      this.logger.error('Password is not correct.');
      throw new InternalServerErrorException('Password is not correct.');
    }
  }

  async activateAccount(payLoad: AccountActivationDto) {
    const tokenExpird = await this.JwtService.isTokenExpired(
      payLoad.activationKey
    );
    if (tokenExpird) {
      throw new GoneException(
        'Activation key has expired, please try signing in and request new activation.'
      );
    }
    const { ACCOUNT_ACTIVATION_TOKEN_SECRET } = process.env;
    try {
      const payload = await this.JwtService.verifyJwtAccessToken(
        payLoad.activationKey,
        ACCOUNT_ACTIVATION_TOKEN_SECRET
      );
      const user = await this.userRepo.findUser({
        where: { email: payload.sub },
      } as FindOneOptions<User>);
      console.log('user -> ', user);

      await this.userRepo.update(user.id, { accountActivated: true });
      return {
        success: true,
        message: 'Your account has been activated successfully.',
      };
    } catch (err) {
      this.logger.error('Error activating account', err.message);
      throw new InternalServerErrorException('Failed to activate account');
    }
  }

  async resendActivationRequest(payLoad: AccountActivationDto) {
    const token = await this.JwtService.isTokenValid(payLoad.activationKey);
    // console.log('token', token);

    if (token) {
      const activationUrl = await this.JwtService.createUserAccountActivation(
        token.sub
      );
      return {
        status: 200,
        message: 'Please click on this link.',
        activationUrl,
      };
    }
  }

  private async isValidUser(username: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: [{ username }, { email: username }],
    } as FindOneOptions<User>);

    if (!user) {
      throw new UnauthorizedException('Email not registered');
    }

    if (!user.accountActivated) {
      throw new UnauthorizedException('Account is not activated');
    }

    if (user.lockedUntil !== null) {
      throw new UnauthorizedException('Account is locked');
    }

    return user;
  }
}
