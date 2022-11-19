import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from 'src/team/dto/create-team.dto';
import { Team } from 'src/team/entities/team.model';
import { TeamService } from 'src/team/team.service';
import { CryptoService } from './crypto/crypto.service';
import { LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {}
