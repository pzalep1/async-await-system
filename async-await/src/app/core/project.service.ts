import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PROJECT_ROUTES, USER_ROUTES } from '../../environments/routes';
import { AuthService } from './auth.service';

const TOKEN_KEY = 'presence';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private headers = new HttpHeaders();

  constructor(private auth: AuthService, private http: HttpClient) { }

  getUsersProjects(userId: number) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.get(PROJECT_ROUTES.GET_USERS_PROJECTS(userId), {
        headers: this.auth.headers
      })
      .toPromise()
      .then((res: any) => {
        console.log(res);
      });
    });
  }

  getProject(userId: number, projectId: number) {
    return new Promise((resolve, reject) => {

    });
  }

  createProject(userId: number, project: any) {
    console.log(this.auth);
    this.http.post(PROJECT_ROUTES.CREATE_PROJECT(17), { headers: this.auth.headers } ).subscribe(val => {
      console.log(val);
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
    console.log(token);
    if (token !== null) {
      console.log('setting')
      this.headers.append('Authorization', `${token}`);
      this.headers.append('not', 'not');
      console.log(this.auth.headers);
      console.log('this.headers', this.headers.get('Authorization'));
    }
  }
}
