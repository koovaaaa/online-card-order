import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Country } from '../../../../entity/country/country.entity';

export class AddCityAdminDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cityName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  postalCode: string;
  @ApiProperty()
  @IsNotEmpty()
  country: Country;
}
