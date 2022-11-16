import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateTeamDto } from 'src/team/dto/create-team.dto';
import { Team } from 'src/team/entities/team.model';

export class CreateBusinessDto {
  @IsString()
  @IsNotEmpty()
  businessName: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateTeamDto)
  owner: Team;
}
