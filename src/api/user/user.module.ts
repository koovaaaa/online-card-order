import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entity/user/user.entity';
import { ExceptionService } from '../../helper/services/exception.service';
import { PasswordService } from '../../helper/services/password.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, ExceptionService, PasswordService],
})
export class UserModule {}
