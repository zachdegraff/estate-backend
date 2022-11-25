import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private config: ConfigService) {}
  createMongooseOptions():
    | MongooseModuleOptions
    | Promise<MongooseModuleOptions> {
    console.log(this.config.get('databaseUrl'));
    console.log(this.config.get('jwtExpiration'));

    return {
      uri: `mongodb+srv://root:mongo@firstnodeproject.g442jly.mongodb.net/RealHaven?retryWrites=true&w=majority`,
    };
  }
}
