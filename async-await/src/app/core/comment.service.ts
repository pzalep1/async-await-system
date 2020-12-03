import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDEA_ROUTES, COMMENT_ROUTES } from '../../environments/routes';
import { AuthService } from './auth.service';

const TOKEN_KEY = 'presence';
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private headers = new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: localStorage.getItem(TOKEN_KEY),
  });

  constructor(private auth: AuthService, private http: HttpClient) { }

  getCommentsForIdea(userId: number, projectId: number, ideaId: number) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.get(IDEA_ROUTES.GET_COMMENTS_FOR_IDEA(userId, projectId, ideaId),
      {
        headers: this.headers
      })
      .toPromise()
      .then((res: any) => {
        console.log(res)
        resolve(res);
      },
      (err) => {
        reject(err);
      });
    });
  }

  createComment(userId: number, projectId: number, ideaId: number, comment: any) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.post(COMMENT_ROUTES.CREATE_COMMENT(userId, projectId, ideaId),
      {
        comment
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

  deleteComment(userId: number, projectId: number, ideaId: number, commentId: number) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.delete(COMMENT_ROUTES.DELETE_COMMENT(userId, projectId, ideaId, commentId),
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

  updateComment(userId: number, projectId: number, ideaId: number, ideaUpdate: any, commentId: number) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.post(COMMENT_ROUTES.UPDATE_COMMENT(userId, projectId, ideaId, commentId),
      {
        
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

  getComment(userId: number, projectId: number, ideaId: number) {
    return new Promise((resolve, reject) => {

    });
  }
  private initHeaders() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token !== null) {
      this.headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    }
  }
}
