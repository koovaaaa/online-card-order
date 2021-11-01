import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Event } from '../../../../entity/event/event.entity';

export class AddTicketDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Unesite naziv ulaznice! ' })
  @IsString()
  ticketName: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Unesite opis! ' })
  @IsString()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  event: Event;
  @ApiProperty()
  @IsNotEmpty({ message: 'Unesite cijenu! ' })
  @IsNumber()
  @IsPositive()
  ticketPrice: number;
  @ApiProperty()
  @IsNotEmpty({ message: 'Unesite broj dostupnih ulaznica! ' })
  @IsNumber()
  @IsPositive()
  ticketCount: number;
}
