import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserTicketService } from './user-ticket.service';
import { GetUser } from '../../auth/get-user.decorator';
import { User } from '../../../entity/user/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { Ticket } from '../../../entity/ticket/ticket.entity';

@ApiTags('User Ticket')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('user-ticket')
export class UserTicketController {
  constructor(private readonly userTicketService: UserTicketService) {}

  @Get('get-ticket/:id')
  async getTicket(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<{ ticket: Ticket; price: string }> {
    return await this.userTicketService.getTicket(id, user);
  }

  @Get('get-event-tickets/:eventId')
  async getTicketsForEvent(
    @Param('eventId') eventId: string,
    @GetUser() user: User,
  ): Promise<{ ticket: Ticket; price: string }[]> {
    return await this.userTicketService.getTicketsForEvent(eventId, user);
  }
}
