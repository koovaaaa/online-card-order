import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { User } from '../../entity/user/user.entity';
import { UserLoginDto } from './dto/user-login.dto';

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
}
