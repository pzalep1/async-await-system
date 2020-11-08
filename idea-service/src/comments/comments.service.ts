import { Injectable } from 'idea-service/node_modules/@nestjs/common';
import { SqlDriver } from '../drivers/sqlDriver.service';

@Injectable()
export class CommentService {
  constructor(private readonly sqlDriver: SqlDriver){}

  createComment(userId: string, projectId: string, ideaId: string, comment: string): any {
    return this.sqlDriver.createComment(userId,projectId,ideaId,comment);
  }
  deleteComment(userId: string, projectId: string, ideaId: string): any {
    return this.sqlDriver.deleteComment(userId,projectId,ideaId);
  }
  updateComment(userId: string, projectId: string, ideaId: string, commentId: string, comment: string): any {
    return this.sqlDriver.updateComment(userId,projectId,ideaId,comment);
  }
  getComment(userId: string, projectId: string, ideaId: string, comment: string): any {
    return this.sqlDriver.getComment(userId,projectId,ideaId,comment)
  }
}