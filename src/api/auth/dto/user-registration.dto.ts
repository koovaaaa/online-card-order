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
  @IsNotEmpty({ message: "Polje 'Ime' ne smije biti prazno! " })
  @IsString()
  name: string;
  @ApiProperty()
  @IsNotEmpty({ message: "Polje 'Prezime' ne smije biti prazno! " })
  @IsString()
  surname: string;
  @ApiProperty()
  @IsNotEmpty({ message: "Polje 'Korisničko ime' ne smije biti prazno! " })
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  username: string;
  @ApiProperty()
  @IsNotEmpty({ message: "Polje 'e-mail ne smije biti prazno! " })
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
  @IsNotEmpty({ message: "Polje 'Lozinka' ne smije biti prazno! " })
  @IsString()
  @MinLength(8)
  @MaxLength(40)
  password: string;
  @ApiProperty()
  @IsNotEmpty({ message: "Polje 'Adresa' ne smije biti prazno! " })
  @IsString()
  address: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Izaberite grad! ' })
  city: City;
  @ApiProperty()
  @IsNotEmpty({ message: 'Izaberite državu! ' })
  country: Country;
}
