import { Injectable } from '@nestjs/common';
import { AddEventDto } from './dto/add-event.dto';
import { ExceptionService } from '../../../helper/services/exception.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../../entity/event/event.entity';
import { EventRepository } from '../../../repository/event/event.repository';
import { User } from '../../../entity/user/user.entity';
import { DeleteResult, LessThan, MoreThan, UpdateResult } from 'typeorm';
import { ChangeEventDto } from './dto/change-event.dto';

@Injectable()
export class EmployeeEventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: EventRepository,
    private readonly exceptionService: ExceptionService,
  ) {}
  async getAllEvents(): Promise<{ events: Event[]; numberOfEvents: number }> {
    try {
      const events = await this.eventRepository.findAndCount({
        relations: ['category', 'city', 'country'],
      });
      return { events: events[0], numberOfEvents: events[1] };
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getActiveEvents(): Promise<{
    events: Event[];
    numberOfEvents: number;
  }> {
    try {
      const dateNow = new Date();
      const events = await this.eventRepository.findAndCount({
        where: { eventDate: MoreThan(dateNow) },
        relations: ['category', 'country', 'city'],
      });

      return { events: events[0], numberOfEvents: events[1] };
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getPreviousEvents(): Promise<Event[]> {
    try {
      const dateNow = new Date();
      return await this.eventRepository.find({
        eventDate: LessThan(dateNow),
      });
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
