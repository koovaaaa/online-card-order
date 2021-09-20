import { Module } from '@nestjs/common';
import { AdminCategoryController } from './admin-category.controller';
import { AdminCategoryService } from './admin-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../../entity/category/category.entity';
import { ExceptionService } from '../../../helper/services/exception.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [AdminCategoryController],
  providers: [AdminCategoryService, ExceptionService],
})
export class AdminCategoryModule {}
