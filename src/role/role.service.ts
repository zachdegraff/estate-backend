import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleDocument } from './model/role.model';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}
  async create(createRoleDto: CreateRoleDto) {
    return this.roleModel.create(createRoleDto);
  }

  async findAll() {
    return `This action returns all role`;
  }

  async findByName(name: string): Promise<RoleDocument> {
    return this.roleModel.findOne({ name });
  }
  async findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  async remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
