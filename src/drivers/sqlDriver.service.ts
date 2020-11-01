import { Injectable } from '@nestjs/common';

@Injectable()
export class SqlDriver {
  getHello(): string {
    return 'Hello World!';
  }
}