import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team, TeamDocument } from './model/team.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(Team.name) private userModel: Model<TeamDocument>) {}

  async createUser(data: any) {
    return this.userModel.create(data);
  }
}
