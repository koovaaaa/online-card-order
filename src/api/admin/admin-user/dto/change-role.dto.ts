import { UserRoleEnum } from '../../../../enum/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class ChangeRoleDto {
  @ApiProperty()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}
