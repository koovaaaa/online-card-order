import { Module } from '@nestjs/common';
import { EmployeeTicketController } from './employee-ticket.controller';
import { EmployeeTicketService } from './employee-ticket.service';

@Module({
  controllers: [EmployeeTicketController],
  providers: [EmployeeTicketService]
})
export class EmployeeTicketModule {}
