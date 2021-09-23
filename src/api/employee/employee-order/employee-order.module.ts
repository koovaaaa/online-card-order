import { Module } from '@nestjs/common';
import { EmployeeOrderController } from './employee-order.controller';
import { EmployeeOrderService } from './employee-order.service';

@Module({
  controllers: [EmployeeOrderController],
  providers: [EmployeeOrderService]
})
export class EmployeeOrderModule {}
