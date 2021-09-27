import { Module } from '@nestjs/common';
import { UserCartController } from './user-cart.controller';
import { UserCartService } from './user-cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../../../entity/ticket/ticket.entity';
import { CartTicket } from '../../../entity/cart-ticket/cart-ticket.entity';
import { Order } from '../../../entity/order/order.entity';
import { Cart } from '../../../entity/cart/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Ticket, CartTicket, Order])],
  controllers: [UserCartController],
  providers: [UserCartService],
})
export class UserCartModule {}
