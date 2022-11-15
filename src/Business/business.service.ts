import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team, TeamDocument } from 'src/user/model/team.model';
import { Business, BusinessDocument } from './model/business.model';

@Injectable()
export class BusinessService {
  /**
   *
   * @param businessModel
   * @param teamModel
   * TODO
   * Delegate the team creation to the team service... pass the data and accept response
   * Remove the model from business module
   */
  constructor(
    @InjectModel(Business.name) private businessModel: Model<BusinessDocument>,
    @InjectModel(Team.name) private teamModel: Model<TeamDocument>,
  ) {}

  async createBusiness(data: any) {
    const owner = new Team();
    owner.firsntName = data.firsntName;
    owner.lastName = data.lastName;
    owner.email = data.email;

    await this.teamModel.create(owner);
    return await this.businessModel.create({ ...data, owner });
  }
}
