import { CountryNameEnum } from '../../../../enum/country.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { CurrencyEnum } from '../../../../enum/currency.enum';

export class AddCountryAdminDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(CountryNameEnum)
  countryName: CountryNameEnum;
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(CurrencyEnum)
  currency: CurrencyEnum;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  baseForConversionToBAM: number;
}
