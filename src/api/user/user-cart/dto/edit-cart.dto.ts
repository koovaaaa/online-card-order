import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Ticket } from '../../../../entity/ticket/ticket.entity';

export class EditCartDto {
  @ApiProperty()
  @IsNotEmpty()
  ticket: Ticket;
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  quantity: number;
}
