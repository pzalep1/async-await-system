import { Module } from 'idea-service/node_modules/@nestjs/common';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
import { SqlDriver } from '../drivers/sqlDriver.service';
@Module({
  imports: [SqlDriver],
  controllers: [VotesController],
  providers: [VotesService, SqlDriver]
})
export class VotesModule {}