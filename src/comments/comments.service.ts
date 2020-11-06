import { Injectable } from '@nestjs/common';
import { SqlDriver } from '../drivers/sqlDriver.service';

@Injectable()
export class CommentService {
  constructor(private readonly sqlDriver: SqlDriver){}

  createComment(userId: string, projectId: string, ideaId: string, comment: string) {
    return this.sqlDriver.createComment(userId,projectId,ideaId,comment);
  }
  deleteComment(userId: string, projectId: string, ideaId: string) {
    return this.sqlDriver.deleteComment(userId,projectId,ideaId);
  }
  updateComment(userId: string, projectId: string, ideaId: string, comment: string) {
    return this.sqlDriver.updateComment(userId,projectId,ideaId,comment);
  }
  getComment(userId: string, projectId: string, ideaId: string, comment: string) {
    return this.sqlDriver.getComment(userId,projectId,ideaId,comment)
  }
}