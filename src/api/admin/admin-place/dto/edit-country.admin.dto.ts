import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { CountryNameEnum } from '../../../../enum/country.enum';
import { CurrencyEnum } from '../../../../enum/currency.enum';

export class EditCountryAdminDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(CountryNameEnum)
  countryName: CountryNameEnum;
  @ApiProperty()
  @IsOptional()
  @IsEnum(CurrencyEnum)
  currency: CurrencyEnum;
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  baseForConversionToBAM: number;
}
