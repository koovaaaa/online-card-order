import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entity/user/user.entity';
import { UserRepository } from '../../repository/user/user.repository';
import { ExceptionService } from '../../helper/services/exception.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
    private readonly exceptionService: ExceptionService,
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
}
