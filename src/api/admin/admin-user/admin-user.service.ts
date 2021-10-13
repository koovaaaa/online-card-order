import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../entity/user/user.entity';
import { UserRepository } from '../../../repository/user/user.repository';
import { ExceptionService } from '../../../helper/services/exception.service';
import { UserRoleEnum } from '../../../enum/user-role.enum';
import { UpdateResult } from 'typeorm';
import { PaginationDto } from '../../../helper/dto/pagination.dto';
import { PaginationTypeEnum } from '../../../enum/pagination-type.enum';
import { PaginationService } from '../../../helper/services/pagination.service';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly exceptionService: ExceptionService,
    private readonly paginationService: PaginationService,
  ) {}

  async getAllUsers(
    pagination: PaginationDto,
  ): Promise<{ users: User[]; numberOfUsers: number; defaultPerPage: number }> {
    try {
      const { limit, skip } = await this.paginationService.setPagination(
        pagination,
        PaginationTypeEnum.TABLE,
      );

      const users = await this.userRepository.findAndCount({
        relations: ['country', 'city'],
        take: limit,
        skip: skip,
      });

      return {
        users: users[0],
        numberOfUsers: users[1],
        defaultPerPage: parseInt(process.env.DEFAULT_PER_PAGE_FOR_TABLE),
      };
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
