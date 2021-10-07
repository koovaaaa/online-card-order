import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../../entity/category/category.entity';
import { CategoryRepository } from '../../../repository/category/category.repository';
import { ExceptionService } from '../../../helper/services/exception.service';
import { Event } from '../../../entity/event/event.entity';
import { EventRepository } from '../../../repository/event/event.repository';
import { MoreThan } from 'typeorm';
import { Country } from '../../../entity/country/country.entity';
import { City } from '../../../entity/city/city.entity';
import { CountryRepository } from '../../../repository/country/country.repository';
import { CityRepository } from '../../../repository/city/city.repository';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class UserEventService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: CategoryRepository,
    //@InjectRepository(Event)
    private readonly eventRepository: EventRepository,
    @InjectRepository(Country)
    private readonly countryRepository: CountryRepository,
    @InjectRepository(City)
    private readonly cityRepository: CityRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async getCategories(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getEventsFromCategory(categoryId: string): Promise<Event[]> {
    try {
      return await this.eventRepository.find({
        where: { category: categoryId, eventDate: MoreThan(new Date()) },
      });
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getEventsInCountry(countryId: string): Promise<Event[]> {
    try {
      return await this.eventRepository.find({
        where: { country: countryId, eventDate: MoreThan(new Date()) },
      });
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getEventsInCity(cityId: string): Promise<Event[]> {
    try {
      return await this.eventRepository.find({
        where: { city: cityId, eventDate: MoreThan(new Date()) },
      });
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getEvent(eventId: string): Promise<Event> {
    try {
      return await this.eventRepository.findOneOrFail(eventId);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getActiveEvents(filter: FilterDto): Promise<Event[]> {
    try {
      return await this.eventRepository.findActiveFilters(filter);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getNewestEvents(): Promise<Event[]> {
    try {
      return await this.eventRepository.find({
        order: { eventDate: 'DESC' },
        relations: ['country', 'city'],
        take: 3,
      });
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }
}
