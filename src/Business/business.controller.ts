import { Body, Controller, Post } from '@nestjs/common';
import { BusinessService } from './business.service';

@Controller('business')
export class BusinessController {
  constructor(private businessService: BusinessService) {}

  @Post()
  async createBusiness(@Body() data: any) {
    return await this.businessService.createBusiness(data);
  }
}
