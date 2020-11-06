import { Injectable } from '@nestjs/common';
import { SqlDriver } from '../drivers/sqlDriver.service';

@Injectable()
export class ProjectService {
  constructor(private readonly sqlDriver: SqlDriver) {}
  
  getAdminProjects(userId: string):any{
    return this.sqlDriver.getAllProjectsForAdmin(userId);
  }
  getUserProjects(userId: string):any{
    return this.sqlDriver.getAllProjectsForUser(userId);
  }
  //edited route
  getProject(userId: string,projectId: string):any{
    return this.sqlDriver.getProject(userId,projectId);
  }
  createProject(userId: string, name: string, description: string, color: string){
    return this.sqlDriver.createProject(userId,name,description,color);
  }
  addUserToProject(userId: string, projectId: string){
    return this.sqlDriver.addUserToProject(userId,projectId);
  }
  addAdminToProject(userId: string, projectId: string){
    return this.sqlDriver.addAdminToProject(userId,projectId);
  }
  updateProject(userId: string, projectId: string, name: string, description: string, color: string){
    return this.sqlDriver.updateProject(userId,projectId,name,description,color);
  }
  deleteUsersFromProject(userId: string, projectId: string){
    return this.sqlDriver.deleteUsersFromProject(userId,projectId);
  }
  getAllIdeasForProject(projectId: string){
    return this.sqlDriver.getAllIdeasForProject(projectId);
  }
  deleteProject(userId: string, projectId: string){
    return this.sqlDriver.deleteProject(userId,projectId);
  }
}