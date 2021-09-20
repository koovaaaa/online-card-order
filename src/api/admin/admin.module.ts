import { Module } from '@nestjs/common';
import { AdminPlaceModule } from './admin-place/admin-place.module';
import { AdminUserModule } from './admin-user/admin-user.module';
import { AdminCategoryModule } from './admin-category/admin-category.module';

@Module({
  imports: [AdminPlaceModule, AdminUserModule, AdminCategoryModule],
})
export class AdminModule {}
