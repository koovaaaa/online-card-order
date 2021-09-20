import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../../entity/category/category.entity';
import { CategoryRepository } from '../../../repository/category/category.repository';
import { ExceptionService } from '../../../helper/services/exception.service';
import { createCategoryDto } from './dto/create-category.dto';
import { User } from '../../../entity/user/user.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class AdminCategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: CategoryRepository,
    private readonly exceptionService: ExceptionService,
  ) {}
  async getCategories(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async addNewCategory(
    categoryData: createCategoryDto,
    user: User,
  ): Promise<Category> {
    try {
      const category = new Category(categoryData);
      category.createdBy = user;
      category.createdAt = new Date();
      return await this.categoryRepository.save(category);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async deleteCategory(id: string): Promise<DeleteResult> {
    try {
      return await this.categoryRepository.delete(id);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getCategory(categoryId: string): Promise<Category> {
    try {
      return await this.categoryRepository.findOneOrFail(categoryId);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }
}
