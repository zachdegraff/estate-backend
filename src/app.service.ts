import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome To Real Haven Estate APi Running On Docker - Google Cloud run';
  }
}
