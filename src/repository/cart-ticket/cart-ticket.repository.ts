import { EntityRepository, Repository } from 'typeorm';
import { CartTicket } from '../../entity/cart-ticket/cart-ticket.entity';

@EntityRepository(CartTicket)
export class CartTicketRepository extends Repository<CartTicket> {}
