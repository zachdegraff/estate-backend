import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dtos/business.dto';

@Controller('business')
export class BusinessController {
  constructor(private businessService: BusinessService) {}

  @Post()
  async createBusiness(@Body() data: CreateBusinessDto) {
    return await this.businessService.createBusiness(data);
  }

  @Get('owner/:id')
  async getByOwner(@Param('id') ownerId: string) {
    return await this.businessService.findByOwner(ownerId);
  }

  @Get(':id')
  async getBusinessById(@Param('id') id: string) {
    return await this.businessService.findById(id);
  }

  @Get()
  async getAllBusiness() {
    return await this.businessService.findAll();
  }
}
