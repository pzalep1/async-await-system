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
        resolve(res);
      },
      (err) => {
        reject(err);
      });
    });
  }

  createIdea(userId: number, projectId: number, idea: any) {
    return new Promise((resolve, reject) => {
      
    });
  }

  updateIdea(userId: number, projectId: number, ideaUpdates: any) {
    return new Promise((resolve, reject) => {

    });
  }

  getIdea(userId: number, projectId: number, ideaId: number) {
    return new Promise((resolve, reject) => {

    });
  }

  deleteIdea(userId: number, projectId: number, ideaId: number) {
    return new Promise((resolve, reject) => {

    });
  }

  updateState(userId: number, projectId: number, ideaId: number, state: any) {
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
