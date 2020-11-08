import { Injectable } from 'idea-service/node_modules/@nestjs/common';
import { SqlDriver } from '../drivers/sqlDriver.service';

@Injectable()
export class IdeaService {
  constructor(private readonly sqlDriver: SqlDriver) {}

  createIdea(userId: string, projectId: string, idea: string, timestamp: string): any {
    return this.sqlDriver.createIdea(userId,projectId,idea,timestamp);
  }
  updateIdea(userId: string, projectId: string, idea: string, timestamp: string): any {
    return this.sqlDriver.updateIdea(userId,projectId,idea,timestamp);
  }
  getIdea(userId: string, projectId: string, ideaId: string): any {
    return this.sqlDriver.getIdea(userId,projectId,ideaId);
  }
  changeStateOfIdea(projectId: string, ideaId: string, newState: string): any {
    return this.sqlDriver.changeStateOfIdea(projectId,ideaId,newState);
  }
  deleteIdea(projectId: string, ideaId: string): any {
    return this.sqlDriver.deleteIdea(projectId,ideaId);
  }
  getCommentsForIdea(projectId: string, ideaId: string): any {
    return this.sqlDriver.getCommentsForIdea(projectId,ideaId);
  }
}