import { Module } from '@nestjs/common';
import { UserTicketController } from './user-ticket.controller';
import { UserTicketService } from './user-ticket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from '../../../entity/ticket/ticket.entity';
import { ExceptionService } from '../../../helper/services/exception.service';
import { User } from '../../../entity/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, User])],
  controllers: [UserTicketController],
  providers: [UserTicketService, ExceptionService],
})
export class UserTicketModule {}
