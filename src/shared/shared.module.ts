import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendBlueService } from './sendblue/services/sendblue.service';

@Module({
  exports: [SendBlueService],
  providers: [SendBlueService],
  imports: [ConfigModule],
})
export class SharedModule {}
