import { Category } from '../../../../entity/category/category.entity';
import { City } from '../../../../entity/city/city.entity';
import { Country } from '../../../../entity/country/country.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class AddEventDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  eventName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  category: Category;
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  eventDate: Date;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;
  @ApiProperty()
  @IsNotEmpty()
  city: City;
  @ApiProperty()
  @IsNotEmpty()
  country: Country;
  @ApiProperty({ type: 'string', format: 'binary' })
  eventPhoto: any;
}
