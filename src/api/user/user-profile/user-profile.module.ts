import { Module } from '@nestjs/common';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../entity/user/user.entity';
import { ExceptionService } from '../../../helper/services/exception.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserProfileController],
  providers: [UserProfileService, ExceptionService],
})
export class UserProfileModule {}
