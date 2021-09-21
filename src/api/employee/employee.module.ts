import { Module } from '@nestjs/common';
import { EmployeeEventModule } from './employee-event/employee-event.module';
import { EmployeeTicketModule } from './employee-ticket/employee-ticket.module';

@Module({
  imports: [EmployeeEventModule, EmployeeTicketModule]
})
export class EmployeeModule {}
