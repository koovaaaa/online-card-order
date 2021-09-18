import { Injectable } from '@nestjs/common';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { UserRepository } from '../../repository/user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entity/user/user.entity';
import { ExceptionService } from '../../helper/services/exception.service';
import { PasswordService } from '../../helper/services/password.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
    private readonly exceptionService: ExceptionService,
    private readonly passwordService: PasswordService,
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
}
