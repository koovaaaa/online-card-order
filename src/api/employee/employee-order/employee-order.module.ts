import { Module } from '@nestjs/common';
import { EmployeeOrderController } from './employee-order.controller';
import { EmployeeOrderService } from './employee-order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../../entity/order/order.entity';
import { ExceptionService } from '../../../helper/services/exception.service';
import { Cart } from '../../../entity/cart/cart.entity';
import { Ticket } from '../../../entity/ticket/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Cart, Ticket])],
  controllers: [EmployeeOrderController],
  providers: [EmployeeOrderService, ExceptionService],
})
export class EmployeeOrderModule {}
