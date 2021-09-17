import { Module } from '@nestjs/common';
import { AdminPlacesController } from './admin-places.controller';
import { AdminPlacesService } from './admin-places.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '../../../entity/country/country.entity';
import { ExceptionService } from '../../../helper/services/exception.service';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [AdminPlacesController],
  providers: [AdminPlacesService, ExceptionService],
})
export class AdminPlacesModule {}
