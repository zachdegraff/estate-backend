import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const { businessName, owner } = data;
    const businessExist = await this.findByName(businessName);

    if (businessExist) {
      throw new BadRequestException(
        'This business has already been registered',
      );
    }

    const role = await this.roleService.findByName('BUSINESS_OWNER');
    if (!role) {
      throw new BadRequestException('Role does not exist');
    }
    owner.role = { name: role.name, permissions: role.permissions };

    const { password, ...theOwner } = (
      await this.teamService.create(owner)
    ).toObject();
    return await this.businessModel.create({ businessName, owner: theOwner });
  }

  async findByName(businessName: string) {
    return await this.businessModel.findOne({ businessName });
  }

  async findById(id: string) {
    console.log(id);
    return await this.businessModel.findById(id);
  }

  async findAll() {
    return await this.businessModel.find({});
  }

  async findByOwner(ownerId: string) {
    const res = await this.businessModel.findOne({ 'owner._id': ownerId });
    if (!res) {
      throw new NotFoundException('Business For this owner does not exist');
    }

    return res;
  }
}
