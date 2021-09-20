import { Module } from '@nestjs/common';
import { AdminPlaceController } from './admin-place.controller';
import { AdminPlaceService } from './admin-place.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '../../../entity/country/country.entity';
import { ExceptionService } from '../../../helper/services/exception.service';
import { City } from '../../../entity/city/city.entity';
import { PaginationService } from '../../../helper/services/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([Country, City])],
  controllers: [AdminPlaceController],
  providers: [AdminPlaceService, ExceptionService, PaginationService],
})
export class AdminPlaceModule {}
