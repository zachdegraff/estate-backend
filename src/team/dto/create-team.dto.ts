import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Address } from '../entities/team.model';

export class CreateTeamDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => String(value).toLowerCase())
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;

  @IsString()
  profilePicture: string;

  @IsString()
  coverPhoto: string;

  @IsString()
  @MinLength(10, { message: 'Phone number length must be more than 10' })
  phoneNumber: string;

  @IsString()
  @MinLength(3)
  bio: string;

  @IsString()
  idCard: string;

  @IsObject()
  @ValidateNested()
  address: Address;
}
