import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Event } from '../../../../entity/event/event.entity';

export class AddTicketDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ticketName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  event: Event;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  ticketPrice: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  ticketCount: number;
}
