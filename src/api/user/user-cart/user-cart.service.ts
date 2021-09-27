import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../../../entity/cart/cart.entity';
import { CartRepository } from '../../../repository/cart/cart.repository';
import { CartTicket } from '../../../entity/cart-ticket/cart-ticket.entity';
import { CartTicketRepository } from '../../../repository/cart-ticket/cart-ticket.repository';
import { Order } from '../../../entity/order/order.entity';
import { OrderRepository } from '../../../repository/order/order.repository';
import { Ticket } from '../../../entity/ticket/ticket.entity';
import { TicketRepository } from '../../../repository/ticket/ticketRepository';

@Injectable()
export class UserCartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: CartRepository,
    @InjectRepository(CartTicket)
    private readonly cartTicketRepository: CartTicketRepository,
    @InjectRepository(Order)
    private readonly orderRepository: OrderRepository,
    @InjectRepository(Ticket)
    private readonly ticketRepository: TicketRepository,
  ) {}
}
