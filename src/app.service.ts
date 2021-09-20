import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Web application for online sale of tickets for events in Bosnia and Herzegovina and in the region!';
  }
}
