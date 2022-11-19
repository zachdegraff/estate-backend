import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CryptoService } from 'src/auth/crypto/crypto.service';
import { LoginDto } from 'src/auth/dto/auth.dto';
import { RoleService } from 'src/role/role.service';
import { CreateTeamDto, IsEmailDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team, TeamDocument } from './entities/team.model';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<TeamDocument>,
    private readonly crypto: CryptoService,
    private roleService: RoleService,
  ) {}

  async createTeam(createTeamDto: CreateTeamDto, teamRole: string) {
    await this.isEmailUnique(createTeamDto.email);
    const role = await this.getRole(teamRole);
    const password = await this.crypto.hashPassword(createTeamDto.password);
    const team = await this.teamModel.create({
      ...createTeamDto,
      role,
      password,
    });
    return team;
  }

  async login(login: LoginDto) {
    const user = await this.findUserByEmail(login.email);
    await this.isEmailVerified(user);
    await this.checkPassword(login.password, user.password);
    return {
      firstNname: user.firstName,
      lastName: user.lastName,
      email: user.email,
      accessToken: await this.crypto.encryptJwt({
        id: user._id,
        email: user.email,
        roles: user.role,
      }),
    };
  }

  // -----------------------PRIVATE METHODS --------------

  private async getRole(name: string) {
    const role = await this.roleService.findByName(name);
    if (!role) {
      throw new BadRequestException('Role does not exist');
    }
    return { name: role.name, permissions: role.permissions };
  }

  private async checkPassword(plainPass: string, hashedPassword: string) {
    const match = await this.crypto.comparePassword(plainPass, hashedPassword);
    if (!match) {
      throw new NotFoundException('Incorrect Email Or Password');
    }
    return match;
  }

  private async findUserByEmail(email: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return user;
  }

  async isEmailVerified(user: Team) {
    if (!user.isEmailVerified) {
      throw new BadRequestException('Please Verify Your Email Address');
    }
    return user;
  }

  async isEmailUnique(email: string) {
    const user = await this.findByEmail(email);
    if (user) {
      throw new BadRequestException('Email has already been chosen');
    }
  }
  // ----------------------DB MTHDS ---------

  async findAll() {
    return await this.teamModel.find({});
  }

  async findById(id: string) {
    console.log('in find oone');

    return await this.teamModel.findById(id);
  }

  async findByEmail(email: string) {
    return await this.teamModel.findOne({ email });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
