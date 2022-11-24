import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome To Real Haven Estate Container Running On Docker - Google Cloud';
  }
}
