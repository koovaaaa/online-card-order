import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from '../../../repository/order/order.repository';
import { ExceptionService } from '../../../helper/services/exception.service';
import { Order } from '../../../entity/order/order.entity';
import { OrderStatusEnum } from '../../../enum/order-status.enum';
import { Cart } from '../../../entity/cart/cart.entity';
import { CartRepository } from '../../../repository/cart/cart.repository';
import { Ticket } from '../../../entity/ticket/ticket.entity';
import { TicketRepository } from '../../../repository/ticket/ticketRepository';
import { UpdateResult } from 'typeorm';

@Injectable()
export class EmployeeOrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: OrderRepository,
    @InjectRepository(Cart) private readonly cartRepository: CartRepository,
    @InjectRepository(Ticket)
    private readonly ticketRepository: TicketRepository,
    private readonly exceptionService: ExceptionService,
  ) {}
  async getOrdersWithStatusPending(): Promise<Order[]> {
    try {
      return await this.orderRepository.find({
        where: { orderStatus: OrderStatusEnum.PENDING },
        relations: ['cart', 'cart.cartTickets', 'cart.cartTickets.ticket'],
      });
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async getOrderHistory(): Promise<Order[]> {
    try {
      return await this.orderRepository.find({
        where: [
          { orderStatus: OrderStatusEnum.ACCEPTED },
          { orderStatus: OrderStatusEnum.REJECTED },
        ],
      });
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  async acceptOrRejectOrder(
    orderId: string,
    orderStatus: OrderStatusEnum,
  ): Promise<UpdateResult> {
    try {
      const cart = await this.cartRepository.findOneOrFail({
        where: { order: orderId },
        relations: ['cartTickets', 'cartTickets.ticket'],
      });
      if (orderStatus === OrderStatusEnum.ACCEPTED) {
        for (const cartTicket of cart.cartTickets) {
          const ticket = await this.ticketRepository.findOneOrFail(
            cartTicket.ticket.ticketId,
          );
          ticket.ticketCount -= cartTicket.quantity;
          await this.ticketRepository.save(ticket);
        }
      }
      return await this.orderRepository.update(orderId, { orderStatus });
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }
}
