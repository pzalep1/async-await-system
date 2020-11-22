import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IDEA_ROUTES, COMMENT_ROUTES } from '../../environments/routes';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor() { }

  getCommentsForIdea(userId: number, projectId: number, ideaId: number) {

  }

  createComment(userId: number, projectId: number, idea: any) {

  }

  deleteComment(userId: number, projectId: number, ideaId: number) {

  }

  updateComment(userId: number, projectId: number, ideaId: number, ideaUpdate: any) {

  }

  getComment(userId: number, projectId: number, ideaId: number) {

  }
}
