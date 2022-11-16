import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTeamDto } from 'src/team/dto/create-team.dto';
import { TeamService } from 'src/team/team.service';
import { CreateBusinessDto } from './dtos/business.dto';
import { Business, BusinessDocument } from './model/business.model';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business.name) private businessModel: Model<BusinessDocument>,
    private teamService: TeamService,
  ) {}

  async createBusiness(data: CreateBusinessDto) {
    const owner: CreateTeamDto = data.owner;
    console.log('creating Owner');

    await this.teamService.create(owner);
    return await this.businessModel.create({ ...data, owner });
  }
}
