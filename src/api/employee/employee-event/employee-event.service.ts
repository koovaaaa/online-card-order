import { Injectable } from '@nestjs/common';
import { AddEventDto } from './dto/add-event.dto';
import { ExceptionService } from '../../../helper/services/exception.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../../entity/event/event.entity';
import { EventRepository } from '../../../repository/event/event.repository';
import { User } from '../../../entity/user/user.entity';
import { DeleteResult, LessThan, MoreThan, UpdateResult } from 'typeorm';
import { ChangeEventDto } from './dto/change-event.dto';
import { PaginationDto } from '../../../helper/dto/pagination.dto';
import { PaginationService } from '../../../helper/services/pagination.service';
import { PaginationTypeEnum } from '../../../enum/pagination-type.enum';

@Injectable()
export class EmployeeEventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: EventRepository,
    private readonly exceptionService: ExceptionService,
    private readonly paginationService: PaginationService,
  ) {}
  async getAllEvents(pagination: PaginationDto): Promise<{
    events: Event[];
    numberOfEvents: number;
    eventsPerPage: number;
  }> {
    try {
      const { limit, skip } = await this.paginationService.setPagination(
        pagination,
        PaginationTypeEnum.TABLE,
      );
      const events = await this.eventRepository.findAndCount({
        relations: ['category', 'city', 'country'],
        take: limit,
        skip: skip,
      });
      return {
        events: events[0],
        numberOfEvents: events[1],
        eventsPerPage: parseInt(process.env.DEFAULT_PER_PAGE_FOR_TABLE),
      };
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getEvent(id: string): Promise<Event> {
    try {
      return await this.eventRepository.findOneOrFail(id);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getActiveEvents(pagination: PaginationDto): Promise<{
    events: Event[];
    numberOfEvents: number;
  }> {
    try {
      const { limit, skip } = await this.paginationService.setPagination(
        pagination,
        PaginationTypeEnum.TABLE,
      );
      const dateNow = new Date();
      const events = await this.eventRepository.findAndCount({
        where: { eventDate: MoreThan(dateNow) },
        take: limit,
        skip: skip,
        relations: ['category', 'country', 'city'],
      });

      return { events: events[0], numberOfEvents: events[1] };
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getPreviousEvents(pagination: PaginationDto): Promise<{
    events: Event[];
    numberOfEvents: number;
  }> {
    try {
      const { limit, skip } = await this.paginationService.setPagination(
        pagination,
        PaginationTypeEnum.TABLE,
      );
      const dateNow = new Date();
      const events = await this.eventRepository.findAndCount({
        where: { eventDate: LessThan(dateNow) },
        take: limit,
        skip: skip,
        relations: ['category', 'country', 'city'],
      });
      return { events: events[0], numberOfEvents: events[1] };
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async addNewEvent(
    eventData: AddEventDto,
    file: Express.Multer.File,
    user: User,
  ): Promise<Event> {
    try {
      const event = new Event(eventData);
      event.createdBy = user;
      event.eventPhoto =
        file.destination.replace('./uploads/', '') + file.filename;
      return await this.eventRepository.save(event);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async deleteEvent(eventId: string): Promise<DeleteResult> {
    try {
      return await this.eventRepository.delete(eventId);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async editEvent(
    eventId: string,
    file: Express.Multer.File,
    eventData: ChangeEventDto,
    user: User,
  ): Promise<UpdateResult> {
    try {
      let event = await this.eventRepository.findOneOrFail(eventId);
      event = { ...event, ...eventData };
      event.changedBy = user;
      if (file)
        event.eventPhoto =
          file.destination.replace('./uploads/', '') + file.filename;
      return await this.eventRepository.update(eventId, event);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }
}
