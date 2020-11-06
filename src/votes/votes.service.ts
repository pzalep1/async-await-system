import { Injectable } from '@nestjs/common';
import { SqlDriver } from '../drivers/sqlDriver.service';

@Injectable()
export class VotesService {
  constructor(private readonly sqlDriver: SqlDriver) {

  }
  getVotesForIdea(projectId: string, ideaId: string){
    return this.sqlDriver.getVotesForIdea(projectId,ideaId);
  }
  addVote(userId: string, vote: boolean): any {
    return this.sqlDriver.addVote(userId,vote);
  }
  deleteVote(userId: string, projectId: string, ideaId: string, voteId: string){
    return this.sqlDriver.deleteVote(userId, projectId, ideaId, voteId);
  }
  updateVote(userId: string, projectId: string, ideadId: string, voteId: string, vote: boolean){
    return this.sqlDriver.updateVote(userId, projectId, ideadId, voteId, vote);
  }
}