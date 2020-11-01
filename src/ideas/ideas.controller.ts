import { Controller, Get } from '@nestjs/common';
import { IdeaService } from './ideas.service';

@Controller()
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Get()
  getHello(): string {
    return this.ideaService.getHello();
  }
}