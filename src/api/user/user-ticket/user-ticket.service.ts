import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from '../../../entity/ticket/ticket.entity';
import { TicketRepository } from '../../../repository/ticket/ticketRepository';
import { ExceptionService } from '../../../helper/services/exception.service';
import { User } from '../../../entity/user/user.entity';
import { UserRepository } from '../../../repository/user/user.repository';

@Injectable()
export class UserTicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: TicketRepository,
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly exceptionService: ExceptionService,
  ) {}
  async getTicket(
    id: string,
    user: User,
  ): Promise<{ ticket: Ticket; price: string }> {
    try {
      const ticket = await this.ticketRepository.findOneOrFail(id);
      const userDb = await this.userRepository.findOneOrFail(user.userId, {
        relations: ['country'],
      });
      const price =
        (ticket.ticketPrice * userDb.country.baseForConversionToBAM).toFixed(
          2,
        ) +
        ' ' +
        userDb.country.currency;
      return { ticket, price };
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getTicketsForEvent(
    eventId: string,
    user: User,
  ): Promise<{ ticket: Ticket; price: string }[]> {
    try {
      const tickets = await this.ticketRepository.find({
        where: { event: eventId },
      });
      const userDb = await this.userRepository.findOneOrFail(user.userId, {
        relations: ['country'],
      });

      const ticketAndPrice: { ticket: Ticket; price: string }[] = [];

      for (const ticket of tickets) {
        const price =
          (ticket.ticketPrice * userDb.country.baseForConversionToBAM).toFixed(
            2,
          ) +
          ' ' +
          userDb.country.currency;
        ticketAndPrice.push({ ticket, price });
      }

      return ticketAndPrice;
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }
}
