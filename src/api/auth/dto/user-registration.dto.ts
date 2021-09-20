import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { City } from '../../../entity/city/city.entity';
import { Country } from '../../../entity/country/country.entity';

export class UserRegistrationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  surname: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNumberString()
  @Matches(/^[+]{1}[0-9]{9,14}$/, {
    message:
      'Broj mora biti u obliku +387XXXXXX (+387 - Umjesto 387 unosite pozivni broj za vasu drzavu)',
  })
  contactPhone: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(40)
  password: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;
  @ApiProperty()
  @IsNotEmpty()
  city: City;
  @ApiProperty()
  @IsNotEmpty()
  country: Country;
}
