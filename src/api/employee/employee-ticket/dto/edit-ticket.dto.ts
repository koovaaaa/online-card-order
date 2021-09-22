import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Event } from '../../../../entity/event/event.entity';

export class EditTicketDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  ticketName: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;
  @ApiProperty()
  @IsOptional()
  event: Event;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  ticketPrice: number;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  ticketCount: number;
}
