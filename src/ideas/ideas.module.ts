import { Module } from '@nestjs/common';
import { IdeaController } from './ideas.controller';
import { IdeaService } from './ideas.service';
import { SqlDriver } from '../drivers/sqlDriver.service';
@Module({
  imports: [SqlDriver],
  controllers: [IdeaController],
  providers: [IdeaService, SqlDriver],
})
export class IdeaModule {}