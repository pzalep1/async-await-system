import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PROJECT_ROUTES, IDEA_ROUTES } from '../../environments/routes';
import { AuthService } from './auth.service';

const TOKEN_KEY = 'presence';
@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  private headers = new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: localStorage.getItem(TOKEN_KEY),
  });

  constructor(private auth: AuthService, private http: HttpClient) { }

  getIdeasForAProject(userId: number, projectId: number) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.get(PROJECT_ROUTES.GET_IDEAS_FOR_PROJECT(userId, projectId), {
        headers: this.headers,
      })
      .toPromise()
      .then((res: any) => {
        const response = {
          submitted: [],
          review: [],
          accepted: [],
          rejected: []
        }
        res.forEach(idea => {
          if (idea.state === 'submitted') {
            response.submitted.push(idea);
          }
          if (idea.state === 'review') {
            response.review.push(idea);
          }
          if (idea.state === 'accepted') {
            response.accepted.push(idea);
          }
          if (idea.state === 'rejected') {
            response.rejected.push(idea);
          }
        });
        resolve(response);
      },
      (err) => {
        reject(err);
      });
    });
  }

  createIdea(userId: number, projectId: number, idea: any) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.post(IDEA_ROUTES.CREATE_IDEA(userId, projectId),
      {
        idea
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

  updateIdea(userId: number, projectId: number, ideaId: number, ideaUpdates: any) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.patch(IDEA_ROUTES.UPDATE_IDEA(userId, projectId, ideaId), 
      {
        ideaUpdates
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

  getIdea(userId: number, projectId: number, ideaId: number) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.get(IDEA_ROUTES.GET_IDEA(userId, projectId, ideaId), {
        headers: this.headers,
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

  deleteIdea(userId: number, projectId: number, ideaId: number) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.delete(IDEA_ROUTES.DELETE_IDEA(userId, projectId, ideaId), {
        headers: this.headers,
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

  updateState(userId: number, projectId: number, ideaId: number, state: any) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.post(IDEA_ROUTES.UPDATE_STATE(userId, projectId, ideaId),
      {
        newState: state
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
  private initHeaders() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token !== null) {
      this.headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    }
  }
}
