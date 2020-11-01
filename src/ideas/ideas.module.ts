import { Module } from '@nestjs/common';
import { IdeaController } from './ideas.controller';
import { IdeaService } from './ideas.service';

@Module({
  imports: [],
  controllers: [IdeaController],
  providers: [IdeaService],
})
export class IdeaModule {}