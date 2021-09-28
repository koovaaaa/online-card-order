import { ConflictException, Injectable } from '@nestjs/common';
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
import { MailService } from '../../../mail/mail.service';

@Injectable()
export class EmployeeOrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: OrderRepository,
    @InjectRepository(Cart) private readonly cartRepository: CartRepository,
    @InjectRepository(Ticket)
    private readonly ticketRepository: TicketRepository,
    private readonly exceptionService: ExceptionService,
    private readonly mailService: MailService,
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
        relations: ['cartTickets', 'cartTickets.ticket', 'createdBy', 'order'],
      });
      let flagIfOrderAccepted = 0;

      await this.checkIfOrderAccepted(cart.order.orderStatus);
      if (orderStatus === OrderStatusEnum.ACCEPTED) {
        for (const cartTicket of cart.cartTickets) {
          const ticket = await this.ticketRepository.findOneOrFail(
            cartTicket.ticket.ticketId,
          );

          ticket.ticketCount -= cartTicket.quantity;
          await this.ticketRepository.save(ticket);
          flagIfOrderAccepted = 1;
        }
      }

      if (flagIfOrderAccepted) {
        await this.mailService.sendMailForAcceptedOrder(
          cart.createdBy.email,
          cart.createdBy.name,
          cart.createdBy.surname,
        );
      } else {
        await this.mailService.sendMailForRejectedOrder(
          cart.createdBy.email,
          cart.createdBy.name,
          cart.createdBy.surname,
        );
      }

      return await this.orderRepository.update(orderId, { orderStatus });
    } catch (e) {
      this.exceptionService.handleException(e);
    }
  }

  checkIfOrderAccepted(status: string) {
    if (status === OrderStatusEnum.ACCEPTED)
      throw new ConflictException('Narudzba je vec prihvacena!');
  }
}
