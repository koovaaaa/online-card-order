import { Module } from '@nestjs/common';
import { EmployeeOrderController } from './employee-order.controller';
import { EmployeeOrderService } from './employee-order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../../../entity/order/order.entity';
import { ExceptionService } from '../../../helper/services/exception.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [EmployeeOrderController],
  providers: [EmployeeOrderService, ExceptionService],
})
export class EmployeeOrderModule {}
