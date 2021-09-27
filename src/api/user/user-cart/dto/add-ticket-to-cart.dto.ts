import { Ticket } from '../../../../entity/ticket/ticket.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AddTicketToCartDto {
  @ApiProperty()
  @IsNotEmpty()
  ticket: Ticket;
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  quantity: number;
}
