import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { Country } from '../../../../entity/country/country.entity';

export class EditCityAdminDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  cityName: string;
  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  postalCode: string;
  @ApiProperty()
  @IsOptional()
  country: Country;
}
