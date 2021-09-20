import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { AdminUserService } from './admin-user.service';
import { ChangeRoleDto } from './dto/change-role.dto';
import { UpdateResult } from 'typeorm';
import { User } from '../../../entity/user/user.entity';

@ApiTags('Admin Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admin/users')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}
  @Get('get-users')
  async getAllUsers(): Promise<User[]> {
    return await this.adminUserService.getAllUsers();
  }

  @Get('get-user/:id')
  async getUserById(@Param('id') userId: string): Promise<User> {
    return await this.adminUserService.getUserById(userId);
  }

  @Put('edit-user/:id')
  async editUser(
    @Param('id') userId: string,
    @Body() { role }: ChangeRoleDto,
  ): Promise<UpdateResult> {
    return await this.adminUserService.editUser(userId, role);
  }
}
