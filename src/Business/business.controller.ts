import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { RoleEnum } from 'src/role/enums/role.enum';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dtos/business.dto';

@UseGuards(JwtAuthGuard)
@Controller('business')
export class BusinessController {
  constructor(private businessService: BusinessService) {}

  @Post()
  @Public()
  async createBusiness(@Body() data: CreateBusinessDto) {
    return await this.businessService.createBusiness(data);
  }

  @Get('owner/:id')
  @UseGuards(RoleGuard)
  @Roles(RoleEnum.BUSINESS_OWNER)
  async getByOwner(@Param('id') ownerId: string, @Req() req: Request) {
    console.log('i called the business  mthd');

    return (await this.businessService.findByOwner(ownerId)).populate({
      path: 'owner',
    });
  }

  @Get(':id')
  async getBusinessById(@Param('id') id: string) {
    return await (await this.businessService.findById(id)).populate('ownerId');
  }

  @Get()
  async getAllBusiness() {
    return await this.businessService.findAll();
  }
}
