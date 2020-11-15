import { Module } from '@nestjs/common';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
@Module({
  imports: [],
  controllers: [VotesController],
  providers: [VotesService]
})
export class VotesModule {}