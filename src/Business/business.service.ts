import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from 'src/role/model/role.model';
import { RoleService } from 'src/role/role.service';
import { CreateTeamDto } from 'src/team/dto/create-team.dto';
import { TeamService } from 'src/team/team.service';
import { CreateBusinessDto } from './dtos/business.dto';
import { Business, BusinessDocument } from './model/business.model';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(Business.name) private businessModel: Model<BusinessDocument>,
    private teamService: TeamService,
    private roleService: RoleService,
  ) {}

  async createBusiness(data: CreateBusinessDto) {
    const businessExist = await this.findByName(data.businessName);
    if (businessExist) {
      throw new BadRequestException(
        'This business has already been registered',
      );
    }
    const owner: CreateTeamDto & { role: object } = data.owner;
    const role = await this.roleService.findByName('BUSINESS_OWNER');
    if (!role) {
      throw new BadRequestException('Role does not exist');
    }

    owner.role = { name: role.name, permissions: role.permissions };

    console.log(owner);

    await this.teamService.create(owner);

    return await this.businessModel.create({ ...data, owner });
  }

  async findByName(name: string) {
    return await this.businessModel.findOne({ name });
  }
}
