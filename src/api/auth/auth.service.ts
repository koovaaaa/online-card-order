import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { UserRepository } from '../../repository/user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entity/user/user.entity';
import { ExceptionService } from '../../helper/services/exception.service';
import { PasswordService } from '../../helper/services/password.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../../mail/mail.service';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
    private readonly exceptionService: ExceptionService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}
  async singUp(userData: UserRegistrationDto): Promise<User> {
    try {
      let user: User = new User(userData);
      user = await this.passwordService.hashPasswordAndGenerateSalt(user);
      user = await this.userRepository.save(user);
      await this.mailService.sendWelcomeMail(user);
      return user;
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async singIn(loginData: UserLoginDto): Promise<string> {
    try {
      const user = await this.userService.findUserByEmailOrUsername(
        loginData.usernameOrEmail,
      );
      await this.checkPassword(user, loginData.password);

      const payload: JwtPayloadInterface = { username: user.username };
      return this.jwtService.sign(payload);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async forgotPassword(usernameOrEmail: string): Promise<void> {
    try {
      const user = await this.userService.findUserByEmailOrUsername(
        usernameOrEmail,
      );

      const token = this.jwtService.sign(
        { username: user.username },
        {
          secret: process.env.JWT_SECRET_FOR_PASSWORD_RESET,
          expiresIn: parseInt(process.env.JWT_TOKEN_RESET_PASSWORD_EXPIRES),
        },
      );

      await this.mailService.sendMailForResetPassword(user, token);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async resetPassword(id: string, token: string, password: string) {
    try {
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async checkPassword(user: User, password: string) {
    if ((await bcrypt.hash(password, user.salt)) !== user.passwordHash)
      throw new UnauthorizedException('Lozinka nije ispravna!');
  }
}