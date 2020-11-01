import { Injectable } from '@nestjs/common';

@Injectable()
export class IdeaService {
  getHello(): string {
    return 'Hello World!';
  }
}