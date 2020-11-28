import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDEA_ROUTES, PROJECT_ROUTES, USER_ROUTES } from '../../environments/routes';
import { AuthService } from './auth.service';

const TOKEN_KEY = 'presence';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private headers = new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: localStorage.getItem(TOKEN_KEY),
  });

  constructor(private auth: AuthService, private http: HttpClient) { }

  getUsersProjects(userId: number) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.post(PROJECT_ROUTES.GET_USERS_PROJECTS(userId), {
        headers: this.headers
      })
      .toPromise()
      .then((res: any) => {
        console.log('res', res);
      });
    });
  }

  getProject(userId: number, projectId: number) {
    return new Promise((resolve, reject) => {

    });
  }

  createProject(userId: number, project: any) {
    console.log('heads', this.headers);
    this.http.post(PROJECT_ROUTES.CREATE_PROJECT(17), {
      headers : this.headers
    }).subscribe(val => {
      console.log('nope', val);
    });
    // PROJECT_ROUTES.CREATE_PROJECT(userId)
  }

  addUserToProject(userId: number, projectId: number, newUserId: number) {
    return new Promise((resolve, reject) => {

    });
  }

  getUsersForProject(userId: number, projectId: number) {
    return new Promise((resolve, reject) => {

    });
  }

  addAdminToProject(userId: number, projectId: number, newAdminId: number) {
    return new Promise((resolve, reject) => {

    });
  }

  getAdminsForProject(userId: number, projectId: number) {
    return new Promise((resolve, reject) => {

    });
  }

  updateProject(userId: number, projectId: number, updates: any) {
    return new Promise((resolve, reject) => {

    });
  }

  removeUserFromProject(userId: number, projectId: number, removeUserId: number) {
    return new Promise((resolve, reject) => {

    });
  }

  deleteProject(userId: number, projectId: number) {
    return new Promise((resolve, reject) => {

    });
  }

  private initHeaders() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token !== null) {
      console.log('otke', token);
      this.headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);
      console.log('nope', this.headers.get('Authorization'));
    }
  }
}
