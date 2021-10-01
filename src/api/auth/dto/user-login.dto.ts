import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Unesite korisnicko ime! ' })
  @IsString()
  usernameOrEmail: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Unesite lozinku!' })
  @IsString()
  password: string;
}
