import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PROJECT_ROUTES } from '../../environments/routes';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private auth: AuthService) { }

  getUsersProjects(userId: number) {

  }

  getProject(userId: number, projectId: number) {

  }

  createProject(userId: number, project: any) {

  }

  addUserToProject(userId: number, projectId: number, newUserId: number) {

  }

  getUsersForProject(userId: number, projectId: number) {

  }

  addAdminToProject(userId: number, projectId: number, newAdminId: number) {

  }

  getAdminsForProject(userId: number, projectId: number) {

  }

  updateProject(userId: number, projectId: number, updates: any) {

  }

  removeUserFromProject(userId: number, projectId: number, removeUserId: number) {

  }

  deleteProject(userId: number, projectId: number) {

  }
}
