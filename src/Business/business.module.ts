import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { RoleModule } from 'src/role/role.module';
import { TeamModule } from 'src/team/team.module';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { Business, BusinessSchema } from './model/business.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Business.name, schema: BusinessSchema },
    ]),
    TeamModule,
    RoleModule,
  ],
  providers: [
    BusinessService,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
  exports: [BusinessService],
  controllers: [BusinessController],
})
export class BusinessModule {}
