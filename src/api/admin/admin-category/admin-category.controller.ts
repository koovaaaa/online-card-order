import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminCategoryService } from './admin-category.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { createCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { GetUser } from '../../auth/get-user.decorator';
import { User } from '../../../entity/user/user.entity';
import { DeleteResult } from 'typeorm';
import { Category } from '../../../entity/category/category.entity';

@ApiTags('Admin Category')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/categories')
export class AdminCategoryController {
  constructor(private readonly adminCategoryService: AdminCategoryService) {}

  @Get('get-categories')
  async getCategories(): Promise<Category[]> {
    return await this.adminCategoryService.getCategories();
  }

  @Get('get-category/:id')
  async getCategory(@Param('id') categoryId: string): Promise<Category> {
    return await this.adminCategoryService.getCategory(categoryId);
  }

  @Post('add-category')
  async addNewCategory(
    @Body() categoryData: createCategoryDto,
    @GetUser() user: User,
  ): Promise<Category> {
    return await this.adminCategoryService.addNewCategory(categoryData, user);
  }

  @Delete('delete-category/:id')
  async deleteCategory(@Param('id') categoryId: string): Promise<DeleteResult> {
    return await this.adminCategoryService.deleteCategory(categoryId);
  }
}
