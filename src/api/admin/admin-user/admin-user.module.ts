import { Module } from '@nestjs/common';
import { AdminUserController } from './admin-user.controller';
import { AdminUserService } from './admin-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../entity/user/user.entity';
import { ExceptionService } from '../../../helper/services/exception.service';
import { PaginationService } from '../../../helper/services/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminUserController],
  providers: [AdminUserService, ExceptionService, PaginationService],
})
export class AdminUserModule {}
