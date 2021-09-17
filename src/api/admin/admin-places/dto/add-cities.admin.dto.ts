import { AddCityAdminDto } from './add-city.admin.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AddCitiesAdminDto {
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddCityAdminDto)
  cities: AddCityAdminDto[];
}
