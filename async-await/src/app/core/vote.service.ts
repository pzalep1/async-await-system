import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VOTE_ROUTES } from '../../environments/routes';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  voteOnIdea(userId: number, projectId: number, ideaId: number, vote: boolean) {
    return new Promise((resolve, reject) => {

    });
  }

  getVotesForIdea(userId: number, projectId: number, ideaId: number) {
    return new Promise((resolve, reject) => {

    });
  }

  updateVote(userId: number, projectId: number, ideaId: number, voteId: number) {
    return new Promise((resolve, reject) => {

    });
  }

  deleteVote(userId: number, projectId: number, ideaId: number, voteId: number) {
    return new Promise((resolve, reject) => {

    });
  }
}
