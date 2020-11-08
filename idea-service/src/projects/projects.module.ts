import { Module } from 'idea-service/node_modules/@nestjs/common';
import { ProjectController } from './projects.controller';
import { ProjectService } from './projects.service';
import { SqlDriver } from '../drivers/sqlDriver.service';
@Module({
  imports: [SqlDriver],
  controllers: [ProjectController],
  providers: [ProjectService, SqlDriver]
})
export class ProjectModule {}