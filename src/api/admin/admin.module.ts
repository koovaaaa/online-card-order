import { Module } from '@nestjs/common';
import { AdminPlaceModule } from './admin-place/admin-place.module';
import { AdminUserModule } from './admin-user/admin-user.module';

@Module({
  imports: [AdminPlaceModule, AdminUserModule],
})
export class AdminModule {}
