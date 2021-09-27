import { Module } from '@nestjs/common';
import { UserCartController } from './user-cart.controller';
import { UserCartService } from './user-cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartTicket } from '../../../entity/cart-ticket/cart-ticket.entity';
import { Cart } from '../../../entity/cart/cart.entity';
import { ExceptionService } from '../../../helper/services/exception.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartTicket])],
  controllers: [UserCartController],
  providers: [UserCartService, ExceptionService],
})
export class UserCartModule {}
