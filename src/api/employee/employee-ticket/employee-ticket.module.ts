import { Module } from '@nestjs/common';
import { EmployeeTicketController } from './employee-ticket.controller';
import { EmployeeTicketService } from './employee-ticket.service';
import { ExceptionService } from '../../../helper/services/exception.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../../../entity/ticket/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [EmployeeTicketController],
  providers: [EmployeeTicketService, ExceptionService],
})
export class EmployeeTicketModule {}
