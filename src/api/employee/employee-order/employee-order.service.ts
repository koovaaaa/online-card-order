import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from '../../../repository/order/order.repository';
import { ExceptionService } from '../../../helper/services/exception.service';
import { Order } from '../../../entity/order/order.entity';
import { OrderStatusEnum } from '../../../enum/order-status.enum';

@Injectable()
export class EmployeeOrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: OrderRepository,
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
}
