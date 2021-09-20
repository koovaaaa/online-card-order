import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { User } from '../../entity/user/user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async userRegistration(@Body() userData: UserRegistrationDto): Promise<User> {
    return await this.authService.singUp(userData);
  }

  @Post('login')
  async userLogIn(@Body() loginData: UserLoginDto): Promise<string> {
    return await this.authService.singIn(loginData);
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body() { usernameOrEmail }: ForgotPasswordDto,
  ): Promise<void> {
    return await this.authService.forgotPassword(usernameOrEmail);
  }

  @Post('reset-password/:id/:token')
  async resetPassword(
    @Param('id') id: string,
    @Param('token') token: string,
    @Body() { password }: ResetPasswordDto,
  ) {
    return await this.authService.resetPassword(id, token, password);
  }
}
