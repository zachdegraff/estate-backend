import { Transform } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @Transform(({ value }) => String(value).toUpperCase())
  name: string;

  @IsArray()
  permissions: [string];

  @IsString()
  description: string;
}
