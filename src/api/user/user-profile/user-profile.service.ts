import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entity/user/user.entity';
import { UserRepository } from '../../../repository/user/user.repository';
import { ExceptionService } from '../../../helper/services/exception.service';
import { EditUserDto } from './dto/edit-user.dto';
import { UpdateResult } from 'typeorm';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly exceptionService: ExceptionService,
  ) {}
  async getMyProfile(user: User): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(user.userId, {
        relations: ['country', 'city'],
      });
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async editMyProfile(
    user: User,
    userData: EditUserDto,
  ): Promise<UpdateResult> {
    try {
      return await this.userRepository.update(user.userId, userData);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }
}
