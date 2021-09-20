import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminCategoryService {
  getCategories() {
    return 'Kategorije';
  }
}
