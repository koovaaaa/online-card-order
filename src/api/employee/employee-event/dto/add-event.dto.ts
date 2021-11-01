import { Category } from '../../../../entity/category/category.entity';
import { City } from '../../../../entity/city/city.entity';
import { Country } from '../../../../entity/country/country.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class AddEventDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Unesite naziv događaja! ' })
  @IsString()
  eventName: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Unesite opis događaja! ' })
  @IsString()
  description: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Izaberite kategoriju! ' })
  category: Category;
  @ApiProperty()
  @IsNotEmpty({ message: 'Izaberite datum! ' })
  @IsDateString()
  eventDate: Date;
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Unesite adresu! ' })
  address: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Izaberite grad! ' })
  city: City;
  @ApiProperty()
  @IsNotEmpty({ message: 'Izaberite državu ' })
  country: Country;
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty({ message: 'Dodajte fotografiju!' })
  eventPhoto: any;
}
