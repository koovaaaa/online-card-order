import { Injectable } from '@nestjs/common';
import { ExceptionService } from '../../../helper/services/exception.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from '../../../entity/ticket/ticket.entity';
import { TicketRepository } from '../../../repository/ticket/ticketRepository';
import { AddTicketDto } from './dto/add-ticket.dto';
import { User } from '../../../entity/user/user.entity';
import { DeleteResult, MoreThanOrEqual, UpdateResult } from 'typeorm';
import { EditTicketDto } from './dto/edit-ticket.dto';

@Injectable()
export class EmployeeTicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: TicketRepository,
    private readonly exceptionService: ExceptionService,
  ) {}

  async addNewTicket(ticketData: AddTicketDto, user: User): Promise<Ticket> {
    try {
      const ticket = new Ticket(ticketData);
      ticket.createdBy = user;
      return await this.ticketRepository.save(ticket);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getAllTickets(): Promise<Ticket[]> {
    try {
      return await this.ticketRepository.find();
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getTicket(id: string): Promise<Ticket> {
    try {
      return await this.ticketRepository.findOneOrFail(id, {
        relations: ['event'],
      });
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getActiveTickets(): Promise<Ticket[]> {
    try {
      return await this.ticketRepository.find({
        where: { ticketCount: MoreThanOrEqual(1) },
      });
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getSoldTickets(): Promise<Ticket[]> {
    try {
      return await this.ticketRepository.find({
        where: { ticketCount: 0 },
      });
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getTicketsForEvent(eventId: string): Promise<Ticket[]> {
    try {
      return await this.ticketRepository.find({
        where: { event: eventId },
      });
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async editTicket(
    id: string,
    ticketData: EditTicketDto,
    user: User,
  ): Promise<UpdateResult> {
    try {
      let ticket = await this.ticketRepository.findOneOrFail(id);
      ticket = { ...ticket, ...ticketData };
      ticket.editedBy = user;
      return await this.ticketRepository.update(ticket.ticketId, ticket);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async deleteTicket(id: string): Promise<DeleteResult> {
    try {
      return await this.ticketRepository.delete(id);
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }
}
