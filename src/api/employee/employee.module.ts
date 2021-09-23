import { Module } from '@nestjs/common';
import { EmployeeEventModule } from './employee-event/employee-event.module';
import { EmployeeTicketModule } from './employee-ticket/employee-ticket.module';
import { EmployeeOrderModule } from './employee-order/employee-order.module';

@Module({
  imports: [EmployeeEventModule, EmployeeTicketModule, EmployeeOrderModule]
})
export class EmployeeModule {}
