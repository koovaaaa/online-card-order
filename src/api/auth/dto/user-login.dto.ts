import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  usernameOrEmail: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
