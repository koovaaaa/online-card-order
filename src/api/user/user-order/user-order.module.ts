import { Module } from '@nestjs/common';
import { UserOrderController } from './user-order.controller';
import { UserOrderService } from './user-order.service';
import { ExceptionService } from '../../../helper/services/exception.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../../entity/order/order.entity';
import { Cart } from '../../../entity/cart/cart.entity';
import { UserCartService } from '../user-cart/user-cart.service';
import { CartTicket } from '../../../entity/cart-ticket/cart-ticket.entity';
import { Ticket } from '../../../entity/ticket/ticket.entity';
import { OrderRepository } from '../../../repository/order/order.repository';
import { CalculateSumService } from '../../../helper/services/calculate-sum.service';
import { User } from '../../../entity/user/user.entity';
import { MailService } from '../../../mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Cart,
      CartTicket,
      Ticket,
      OrderRepository,
      User,
    ]),
  ],
  controllers: [UserOrderController],
  providers: [
    UserOrderService,
    ExceptionService,
    UserCartService,
    CalculateSumService,
    MailService,
  ],
})
export class UserOrderModule {}
