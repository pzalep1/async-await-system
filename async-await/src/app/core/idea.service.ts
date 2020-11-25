import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PROJECT_ROUTES, IDEA_ROUTES } from '../../environments/routes';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  getIdeasForAProject(userId: number, projectId: number) {
    return new Promise((resolve, reject) => {

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
}
