import { Module } from 'idea-service/node_modules/@nestjs/common';
import { CommentController } from './comments.controller';
import { CommentService } from './comments.service';
import { SqlDriver } from '../drivers/sqlDriver.service';
@Module({
  imports: [SqlDriver],
  controllers: [CommentController],
  providers: [CommentService, SqlDriver],
})
export class CommentModule {}