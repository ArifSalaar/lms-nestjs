import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Today i am learing Nest Js for scalable backend api,s etc';
  }
}
