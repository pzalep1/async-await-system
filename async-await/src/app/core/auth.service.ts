import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDEA_ROUTES, PROJECT_ROUTES, USER_ROUTES } from '../../environments/routes';

const TOKEN_KEY = 'presence';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user?: any;
  private _headers = new HttpHeaders();

  constructor(private http: HttpClient) {}

  set user(value) {
    this._user = value;
  }

  get user() {
    return this._user;
  }

  get headers() {
    return this._headers;
  }

  register(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let authUser = {};
      this.http.post(USER_ROUTES.CREATE_USER(), {user: user})
      .toPromise()
      .then((res: any) => {
        resolve();
      },
      (err) => {
        reject(err);
      });
    });
  }

  login(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let authUser = {};
      this.http.patch(USER_ROUTES.LOGIN(), {user: user})
      .toPromise()
      .then((res: any) => {
        authUser = res.found;
        this.user = authUser;
        this.storeToken(res.token);
        resolve();
      },
      (err) => {
        reject(err);
      });
    });
  }

  logout() {
    this.user = void 0;
    this.deleteToken();
  }

  checkToken() {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      // console.log(this.headers);
      // this.http.get(USER_ROUTES.CHECK_TOKEN(), {
      //   headers: this.headers,
      // })
      // .toPromise()
      // .then((res: any) => {
      //   this.http.post(IDEA_ROUTES.CREATE_IDEA(1, 11), {
      //     headers : this.headers
      //   }).subscribe(val => {
      //     console.log(val);
      //   });
      //   this.user = res;
      //   //resolve();
      // },
      // (err) => {
      //   this.logout();
      //   reject(err);
      // });
      this.http.post(PROJECT_ROUTES.CREATE_PROJECT(17), {
        headers : this.headers,
        withCredentials: true
      }).subscribe(val => {
        console.log('nope', val);
      });
      this.http.get(PROJECT_ROUTES.CREATE_PROJECT(17), {
        headers : this.headers
      }).subscribe(val => {
        console.log('nope', val);
      });
    });
  }

  deleteUser() {
    return new Promise((resolve, reject) => {
      this.initHeaders();
      this.http.delete(USER_ROUTES.DELETE_USER(this.user.userId), {
        headers: this.headers
      })
      .toPromise()
      .then((res: any) => {
        resolve();
      },
      (err) => {
        reject(err);
      });
    });
  }

  private storeToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  private deleteToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  private initHeaders() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token !== null) {
      this._headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);
      console.log('user', this.headers);
    }
  }
}
