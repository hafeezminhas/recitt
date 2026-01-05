import { JwtAuthGuard } from '@common/guards/jwt.auth.guard';
import { LocalAuthGuard } from '@common/guards/local.auth.guard';
import {
  Body,
  Controller,
  Get,
  Request as NestRequest,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import multer from 'multer';

import {
  AccountActivationDto,
  CredentialsDto,
  ForgetPasswordDto,
  ResetPasswordDto,
  UpdatePasswordDto,
  UpdateUserRequestDto,
  UserSignupRequestDto,
} from '@dto/user.dto';
import { AuthService } from './auth.service';
import {
  forgotPasswordSwagger,
  ResetPasswordSwagger,
  SigninSwagger,
  SignupSwagger,
} from './auth.swagger';

const userAvatarMulterOptions: multer.Options = {
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max size
  fileFilter: (req, file, cb: multer.FileFilterCallback) => {
    console.log(`File received: ${file.originalname}, Type: ${file.mimetype}`);

    if (!file.mimetype.match(/^image\/(jpeg|png)$/)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  },
};
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @ApiBody({ type: UserSignupRequestDto })
  @SignupSwagger.ApiOperation
  @SignupSwagger.ApiResponseSuccess
  @SignupSwagger.ApiResponseError
  signup(@Body() payload: UserSignupRequestDto) {
    return this.authService.signUp(payload);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @ApiBody({ type: CredentialsDto })
  @SigninSwagger.ApiOperation
  @SigninSwagger.ApiResponseSuccess
  @SigninSwagger.ApiResponseUnauthorized
  @SigninSwagger.ApiResponseError
  signin(@NestRequest() req) {
    return this.authService.signin(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('profile')
  profile(@NestRequest() req) {
    return this.authService.getProfile(req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  @ApiBody({ type: UpdateUserRequestDto })
  updateProfile(@NestRequest() req, @Body() payload: UpdateUserRequestDto) {
    const { sub } = req.user;
    return this.authService.updateProfile(sub, payload);
  }

  @Post('profile/avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar', userAvatarMulterOptions))
  uploadAvatar(@NestRequest() req, @UploadedFile() file: Express.Multer.File) {
    return this.authService.uploadAvatar(req.user.email, file);
  }

  @Post('forgot-password')
  @ApiBody({ type: ForgetPasswordDto })
  @forgotPasswordSwagger.ApiOperation
  @forgotPasswordSwagger.ApiResponseSuccess
  @forgotPasswordSwagger.ApiResponseError
  forgotPassword(@Body() payload: ForgetPasswordDto) {
    return this.authService.generatePasswordResetOTP(payload.email);
  }

  @Post('reset-password')
  @ApiBody({ type: ResetPasswordDto })
  @ResetPasswordSwagger.ApiResponseSuccess
  @ResetPasswordSwagger.ApiResponseUnauthorized
  @ResetPasswordSwagger.ApiResponseError
  resetPassword(@Body() payload: ResetPasswordDto) {
    return this.authService.resetPassword(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-password')
  updatePassword(@NestRequest() req, @Body() payload: UpdatePasswordDto) {
    return this.authService.updatePassword(req.user.email, payload);
  }

  @Post('activate-account')
  @ApiBody({ type: AccountActivationDto })
  activateAccount(@Body() payLoad: AccountActivationDto) {
    return this.authService.activateAccount(payLoad);
  }
}
