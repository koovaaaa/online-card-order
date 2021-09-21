import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class ChangeEventDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  eventName: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  eventDate: Date;
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  eventPhoto: any;
}
