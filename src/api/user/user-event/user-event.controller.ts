import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { UserEventService } from './user-event.service';
import { Category } from '../../../entity/category/category.entity';
import { ApiTags } from '@nestjs/swagger';
import { Event } from '../../../entity/event/event.entity';
import { ChangeFormatDateInterceptor } from '../../../interceptor/change-format-date.interceptor';
import { FilterDto } from './dto/filter.dto';
import { PaginationDto } from '../../../helper/dto/pagination.dto';
import { PaginationService } from '../../../helper/services/pagination.service';
import { PaginationTypeEnum } from '../../../enum/pagination-type.enum';

@ApiTags('User Event')
@Controller('user-event')
export class UserEventController {
  constructor(
    private readonly userEventService: UserEventService,
    private readonly paginationService: PaginationService,
  ) {}

  @Get('get-active-events')
  @UseInterceptors(ChangeFormatDateInterceptor)
  async getActiveEvents(
    @Query() filter: FilterDto,
    @Query() pagination: PaginationDto,
  ): Promise<{ events: Event[]; eventsCount: number; eventsPerPage: number }> {
    const setPagination = await this.paginationService.setPagination(
      pagination,
      PaginationTypeEnum.EVENT_LIST,
    );
    return await this.userEventService.getActiveEvents(filter, setPagination);
  }

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

  @Get('get-newest-events')
  @UseInterceptors(ChangeFormatDateInterceptor)
  async getNewestEvents(): Promise<{
    events: Event[];
    numberOfEvents: number;
  }> {
    return await this.userEventService.getNewestEvents();
  }
}
