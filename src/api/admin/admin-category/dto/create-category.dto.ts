import { CategoryEnum } from '../../../../enum/category.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class createCategoryDto {
  @ApiProperty()
  @IsEnum(CategoryEnum)
  @IsNotEmpty()
  categoryName: CategoryEnum;
}
