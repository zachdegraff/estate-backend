import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeamDto, IsEmailDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team, TeamDocument } from './entities/team.model';

@Injectable()
export class TeamService {
  constructor(@InjectModel(Team.name) private teamModel: Model<TeamDocument>) {}

  async create(createTeamDto: CreateTeamDto) {
    console.log('creating Owner 2');
    return this.teamModel.create(createTeamDto);
  }

  async findAll() {
    return await this.teamModel.find({});
  }

  async findById(id: string) {
    console.log('in find oone');

    return await this.teamModel.findById(id);
  }

  async findByEmail(email: IsEmailDto) {
    return await this.teamModel.findOne({ email: email.email });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
