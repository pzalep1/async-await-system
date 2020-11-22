import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PROJECT_ROUTES, IDEA_ROUTES } from '../../environments/routes';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  constructor() { }

  getIdeasForAProject(userId: number, projectId: number) {

  }

  createIdea(userId: number, projectId: number, idea: any) {

  }

  updateIdea(userId: number, projectId: number, ideaUpdates: any) {

  }

  getIdea(userId: number, projectId: number, ideaId: number) {

  }

  deleteIdea(userId: number, projectId: number, ideaId: number) {

  }

  updateState(userId: number, projectId: number, ideaId: number, state: any) {
    
  }
}
