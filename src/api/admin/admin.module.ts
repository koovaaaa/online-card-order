import { Module } from '@nestjs/common';
import { AdminPlacesModule } from './admin-places/admin-places.module';

@Module({
  imports: [AdminPlacesModule]
})
export class AdminModule {}
