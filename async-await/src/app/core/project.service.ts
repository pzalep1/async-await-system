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
      this.http.get(PROJECT_ROUTES.GET_USERS_PROJECTS(userId), {
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

  getProject(userId: number, projectId: number) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.get(PROJECT_ROUTES.GET_PROJECT(userId, projectId), {
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

  createProject(userId: number, project: any) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.post(PROJECT_ROUTES.CREATE_PROJECT(userId),{
        project
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

  addUserToProject(userId: number, projectId: number, newUserId: number) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.post(PROJECT_ROUTES.ADD_USER_TO_PROJECT(userId, projectId), 
      {
        userId: newUserId
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

  getUsersForProject(userId: number, projectId: number) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.get(PROJECT_ROUTES.GET_PROJECT_USERS(userId, projectId), {
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

  addAdminToProject(userId: number, projectId: number, newAdminId: number) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.post(PROJECT_ROUTES.ADD_USER_TO_PROJECT(userId, projectId), 
      {
        userId: newAdminId
      }, {
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

  getAdminsForProject(userId: number, projectId: number) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.get(PROJECT_ROUTES.GET_PROJECT_ADMINS(userId, projectId), {
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

  updateProject(userId: number, projectId: number, updates: any) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.patch(PROJECT_ROUTES.UPDATE_PROJECT(userId, projectId), 
      {
        name: updates.name,
        description: updates.description,
        color: updates.color
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

  removeUserFromProject(userId: number, projectId: number, removeUserId: number) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.delete(PROJECT_ROUTES.DELETE_USER_FROM_PROJECT(userId, projectId, removeUserId), {
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

  deleteProject(userId: number, projectId: number) {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.delete(PROJECT_ROUTES.DELETE_PROJECT(userId, projectId), {
        headers: this.headers
      })
      .toPromise()
      .then((res: any) => {
        resolve(res);
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
