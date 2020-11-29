import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDEA_ROUTES, COMMENT_ROUTES } from '../../environments/routes';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  getCommentsForIdea(userId: number, projectId: number, ideaId: number) {
    return new Promise((resolve, reject) => {
      
    });
  }

  createComment(userId: number, projectId: number, idea: any) {
    return new Promise((resolve, reject) => {

    });
  }

  deleteComment(userId: number, projectId: number, ideaId: number) {
    return new Promise((resolve, reject) => {

    });
  }

  updateComment(userId: number, projectId: number, ideaId: number, ideaUpdate: any) {
    return new Promise((resolve, reject) => {

    });
  }

  getComment(userId: number, projectId: number, ideaId: number) {
    return new Promise((resolve, reject) => {

    });
  }
}
