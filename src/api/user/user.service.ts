import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entity/user/user.entity';
import { UserRepository } from '../../repository/user/user.repository';
import { ExceptionService } from '../../helper/services/exception.service';
import { PasswordService } from '../../helper/services/password.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
    private readonly exceptionService: ExceptionService,
    private readonly passwordService: PasswordService,
  ) {}

  async findUserByEmailOrUsername(usernameOrEmail: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({
        where: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async changeForgottenPassword(user: User, password: string) {
    try {
      const userWithNewPassword =
        await this.passwordService.hashPasswordAndGenerateSalt(user, password);
      return this.userRepository.update(user.userId, {
        passwordHash: userWithNewPassword.passwordHash,
        salt: userWithNewPassword.salt,
        passwordChangeCounter: userWithNewPassword.passwordChangeCounter + 1,
        lastPasswordChangeAt: new Date(),
      });
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }
}
