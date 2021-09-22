import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EmployeeTicketService } from './employee-ticket.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { EmployeeGuard } from '../../auth/guards/employee.guard';
import { AddTicketDto } from './dto/add-ticket.dto';
import { GetUser } from '../../auth/get-user.decorator';
import { User } from '../../../entity/user/user.entity';
import { Ticket } from '../../../entity/ticket/ticket.entity';
import { EditTicketDto } from './dto/edit-ticket.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@ApiTags('Employee Ticket')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, EmployeeGuard)
@Controller('employee-ticket')
export class EmployeeTicketController {
  constructor(private readonly employeeTicketService: EmployeeTicketService) {}
  @Post('add-ticket')
  async addNewTicket(
    @Body() ticketData: AddTicketDto,
    @GetUser() user: User,
  ): Promise<Ticket> {
    return await this.employeeTicketService.addNewTicket(ticketData, user);
  }

  @Get('get-tickets')
  async getAllTicket(): Promise<Ticket[]> {
    return await this.employeeTicketService.getAllTickets();
  }

  @Get('get-active-tickets')
  async getActiveTickets(): Promise<Ticket[]> {
    return await this.employeeTicketService.getActiveTickets();
  }

  @Get('get-sold-tickets')
  async getSoldTickets(): Promise<Ticket[]> {
    return await this.employeeTicketService.getSoldTickets();
  }

  @Get('get-ticket/:id')
  async getTicket(@Param('id') ticketId: string): Promise<Ticket> {
    return await this.employeeTicketService.getTicket(ticketId);
  }

  @Get('get-tickets/:eventId')
  async getTicketsForOneEvent(
    @Param('eventId') eventId: string,
  ): Promise<Ticket[]> {
    return await this.employeeTicketService.getTicketsForEvent(eventId);
  }

  @Put('edit-ticket/:id')
  async editTicket(
    @Param('id') ticketId: string,
    @Body() ticketData: EditTicketDto,
    @GetUser() user: User,
  ): Promise<UpdateResult> {
    return await this.employeeTicketService.editTicket(
      ticketId,
      ticketData,
      user,
    );
  }

  @Delete('delete-ticket/:id')
  async deleteTicket(@Param('id') ticketId: string): Promise<DeleteResult> {
    return await this.employeeTicketService.deleteTicket(ticketId);
  }
}
