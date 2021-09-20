import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entity/user/user.entity';
import { UserRepository } from '../../../repository/user/user.repository';
import { ExceptionService } from '../../../helper/services/exception.service';
import { UserRoleEnum } from '../../../enum/user-role.enum';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getUserById(userId: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(userId);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async editUser(userId: string, role: UserRoleEnum): Promise<UpdateResult> {
    try {
      return await this.userRepository.update(userId, { role });
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }
}
