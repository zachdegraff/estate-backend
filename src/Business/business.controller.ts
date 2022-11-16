import { Body, Controller, Post } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dtos/business.dto';

@Controller('business')
export class BusinessController {
  constructor(private businessService: BusinessService) {}

  @Post()
  async createBusiness(@Body() data: CreateBusinessDto) {
    return await this.businessService.createBusiness(data);
  }
}
