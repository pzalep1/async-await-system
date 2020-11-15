import { Injectable } from '@nestjs/common';

@Injectable()
export class VotesService {
  constructor() {

  }
  getVotesForIdea(projectId: string, ideaId: string): any {
    
  }
  addVote(userId: string, vote: boolean): any {
    
  }
  deleteVote(userId: string, projectId: string, ideaId: string, voteId: string): any {
    
  }
  updateVote(userId: string, projectId: string, ideaId: string, voteId: string, vote: boolean): any {
    
  }
}