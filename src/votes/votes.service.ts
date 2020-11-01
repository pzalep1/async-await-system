import { Injectable } from '@nestjs/common';

@Injectable()
export class VotesService {
  getHello(): string {
    return 'Hello World!';
  }
}