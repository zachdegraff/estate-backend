import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role, RoleDocument } from 'src/role/model/role.model';
import { RoleService } from 'src/role/role.service';
import { CreateTeamDto } from 'src/team/dto/create-team.dto';
import { TeamService } from 'src/team/team.service';
import { convertId } from 'src/utils/convertId';
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
    await this.chekBusinessNameUnique(businessName);
    const user = await this.teamService.createTeam(owner, 'BUSINESS_OWNER');
    return await this.businessModel.create({
      businessName,
      owner: user._id,
    });
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
    const id = convertId(ownerId);
    const res = await this.businessModel.findOne({ owner: id }).exec();
    if (!res) {
      throw new NotFoundException('Business For this owner does not exist');
    }

    return res;
  }

  // ---------- PRIATE  METHODS
  private async chekBusinessNameUnique(name: string) {
    const businessExist = await this.findByName(name);
    if (businessExist) {
      throw new BadRequestException(
        'This business has already been registered',
      );
    }
  }
}
