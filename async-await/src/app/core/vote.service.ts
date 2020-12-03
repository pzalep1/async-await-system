import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VOTE_ROUTES } from '../../environments/routes';
import { AuthService } from './auth.service';

const TOKEN_KEY = 'presence';
@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private headers = new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: localStorage.getItem(TOKEN_KEY),
  });

  constructor(private auth: AuthService, private http: HttpClient) { }

  voteOnIdea(userId: number, projectId: number, ideaId: number, vote: boolean) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.post(VOTE_ROUTES.VOTE_ON_IDEA(userId, projectId, ideaId),
      {
        vote
      },
      {
        headers: this.headers
      })
      .toPromise()
      .then((res: any) => {
        resolve(res);
      },
      (err) => {
        reject(err);
      });
    });
  }

  getVotesForIdea(userId: number, projectId: number, ideaId: number) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.get(VOTE_ROUTES.GET_VOTE_FOR_IDEA(userId, projectId, ideaId),
      {
        headers: this.headers
      })
      .toPromise()
      .then((res: any) => {
        resolve(res);
      },
      (err) => {
        reject(err);
      });
    });
  }

  updateVote(userId: number, projectId: number, ideaId: number, voteId: number, vote: any) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.patch(VOTE_ROUTES.UPDATE_VOTE_ON_IDEA(userId, projectId, ideaId, voteId),
      {
        vote
      },
      {
        headers: this.headers
      })
      .toPromise()
      .then((res: any) => {
        resolve(res);
      },
      (err) => {
        reject(err);
      });
    });
  }

  deleteVote(userId: number, projectId: number, ideaId: number, voteId: number) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.delete(VOTE_ROUTES.DELETE_VOTE_ON_IDEA(userId, projectId, ideaId, voteId),
      {
        headers: this.headers
      })
      .toPromise()
      .then((res: any) => {
        resolve(res);
      },
      (err) => {
        reject(err);
      });
    });
  }

  private initHeaders() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token !== null) {
      this.headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    }
  }
}
