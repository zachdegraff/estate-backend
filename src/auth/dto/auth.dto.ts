import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => String(value).toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;
}
