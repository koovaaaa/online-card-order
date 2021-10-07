import { Module } from '@nestjs/common';
import { UserEventController } from './user-event.controller';
import { UserEventService } from './user-event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../../entity/category/category.entity';
import { ExceptionService } from '../../../helper/services/exception.service';
import { Event } from '../../../entity/event/event.entity';
import { Country } from '../../../entity/country/country.entity';
import { City } from '../../../entity/city/city.entity';
import { EventRepository } from '../../../repository/event/event.repository';
import { PaginationService } from '../../../helper/services/pagination.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Event, EventRepository, Country, City]),
  ],
  controllers: [UserEventController],
  providers: [UserEventService, ExceptionService, PaginationService],
})
export class UserEventModule {}
