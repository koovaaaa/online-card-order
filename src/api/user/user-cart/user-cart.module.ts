import { Module } from '@nestjs/common';
import { UserCartController } from './user-cart.controller';
import { UserCartService } from './user-cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartTicket } from '../../../entity/cart-ticket/cart-ticket.entity';
import { Cart } from '../../../entity/cart/cart.entity';
import { ExceptionService } from '../../../helper/services/exception.service';
import { Ticket } from '../../../entity/ticket/ticket.entity';
import { CalculateSumService } from '../../../helper/services/calculate-sum.service';
import { User } from '../../../entity/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartTicket, Ticket, User])],
  controllers: [UserCartController],
  providers: [UserCartService, ExceptionService, CalculateSumService],
})
export class UserCartModule {}
