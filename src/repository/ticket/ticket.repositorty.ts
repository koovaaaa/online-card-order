import { EntityRepository, Repository } from 'typeorm';
import { Ticket } from '../../entity/ticket/ticket.entity';

@EntityRepository(Ticket)
export class TicketRepositorty extends Repository<Ticket> {}
