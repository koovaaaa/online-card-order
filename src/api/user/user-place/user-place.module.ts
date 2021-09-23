import { Module } from '@nestjs/common';
import { UserPlaceController } from './user-place.controller';
import { UserPlaceService } from './user-place.service';
import { ExceptionService } from '../../../helper/services/exception.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '../../../entity/country/country.entity';
import { City } from '../../../entity/city/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Country, City])],
  controllers: [UserPlaceController],
  providers: [UserPlaceService, ExceptionService],
})
export class UserPlaceModule {}
