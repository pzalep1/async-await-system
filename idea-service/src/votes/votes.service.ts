import { Injectable } from 'idea-service/node_modules/@nestjs/common';
import { SqlDriver } from '../drivers/sqlDriver.service';

@Injectable()
export class VotesService {
  constructor(private readonly sqlDriver: SqlDriver) {

  }
  getVotesForIdea(projectId: string, ideaId: string): any {
    return this.sqlDriver.getVotesForIdea(projectId,ideaId);
  }
  addVote(userId: string, vote: boolean): any {
    return this.sqlDriver.addVote(userId,vote);
  }
  deleteVote(userId: string, projectId: string, ideaId: string, voteId: string): any {
    return this.sqlDriver.deleteVote(userId, projectId, ideaId, voteId);
  }
  updateVote(userId: string, projectId: string, ideaId: string, voteId: string, vote: boolean): any {
    return this.sqlDriver.updateVote(userId, projectId, ideaId, voteId, vote);
  }
}