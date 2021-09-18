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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
    private readonly exceptionService: ExceptionService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async singUp(userData: UserRegistrationDto): Promise<User> {
    try {
      let user: User = new User(userData);
      user = await this.passwordService.hashPasswordAndGenerateSalt(user);
      return await this.userRepository.save(user);
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

  async checkPassword(user: User, password: string) {
    if ((await bcrypt.hash(password, user.salt)) !== user.passwordHash)
      throw new UnauthorizedException('Lozinka nije ispravna!');
  }
}
