import { Controller, Get, Param } from '@nestjs/common';
import { UserEventService } from './user-event.service';
import { Category } from '../../../entity/category/category.entity';
import { ApiTags } from '@nestjs/swagger';
import { Event } from '../../../entity/event/event.entity';
import { City } from '../../../entity/city/city.entity';

@ApiTags('User Event')
@Controller('user-event')
export class UserEventController {
  constructor(private readonly userEventService: UserEventService) {}

  @Get('get-categories')
  async getCategories(): Promise<Category[]> {
    return await this.userEventService.getCategories();
  }

  @Get('get-events/:categoryId')
  async getEventsFromCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<Event[]> {
    return await this.userEventService.getEventsFromCategory(categoryId);
  }

  @Get('get-country-events/:countryId')
  async getEventsInCountry(
    @Param('countryId') countryId: string,
  ): Promise<Event[]> {
    return await this.userEventService.getEventsInCountry(countryId);
  }

  @Get('get-city-events/:cityId')
  async getEventsInCity(@Param('cityId') cityId: string): Promise<Event[]> {
    return await this.userEventService.getEventsInCity(cityId);
  }

  @Get('get-event/:id')
  async getEvent(@Param('id') eventId: string): Promise<Event> {
    return await this.userEventService.getEvent(eventId);
  }
}
