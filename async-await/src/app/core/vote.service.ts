import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VOTE_ROUTES } from '../../environments/routes';
@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor() { }

  voteOnIdea(userId: number, projectId: number, ideaId: number, vote: boolean) {

  }

  getVotesForIdea(userId: number, projectId: number, ideaId: number) {

  }

  updateVote(userId: number, projectId: number, ideaId: number, voteId: number) {

  }

  deleteVote(userId: number, projectId: number, ideaId: number, voteId: number) {
    
  }
}
