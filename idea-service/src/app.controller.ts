import { Controller, Get, HttpCode } from 'idea-service/node_modules/@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getHello(): string {
    return 'Welcome to the idea-service!';
  }
}
