import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { GetUser } from '../../auth/get-user.decorator';
import { User } from '../../../entity/user/user.entity';
import { EditUserDto } from './dto/edit-user.dto';
import { UpdateResult } from 'typeorm';

@ApiTags('User Profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get('my-profile')
  async getMyProfile(@GetUser() user: User): Promise<User> {
    return await this.userProfileService.getMyProfile(user);
  }

  @Put('edit-profile')
  async editMyProfile(
    @GetUser() user: User,
    @Body() userData: EditUserDto,
  ): Promise<UpdateResult> {
    return await this.userProfileService.editMyProfile(user, userData);
  }
}
