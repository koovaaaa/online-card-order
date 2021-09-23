import { Module } from '@nestjs/common';
import { UserEventController } from './user-event.controller';
import { UserEventService } from './user-event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../../entity/category/category.entity';
import { ExceptionService } from '../../../helper/services/exception.service';
import { Event } from '../../../entity/event/event.entity';
import { Country } from '../../../entity/country/country.entity';
import { City } from '../../../entity/city/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Event, Country, City])],
  controllers: [UserEventController],
  providers: [UserEventService, ExceptionService],
})
export class UserEventModule {}
