import { Controller, Get } from '@nestjs/common';
import { AdminCategoryService } from './admin-category.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Categories')
@Controller('admin/categories')
export class AdminCategoryController {
  constructor(private readonly adminCategoryService: AdminCategoryService) {}

  @Get('get-categories')
  async getCategories() {
    return await this.adminCategoryService.getCategories();
  }
}
