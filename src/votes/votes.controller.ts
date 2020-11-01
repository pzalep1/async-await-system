import { Controller, Get } from '@nestjs/common';
import { VotesService } from './votes.service';

@Controller()
export class VotesController {
  constructor(private readonly ideaService: VotesService) {}

  @Get()
  getHello(): string {
    return this.ideaService.getHello();
  }
}