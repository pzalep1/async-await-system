import { ProjectService } from './projects.service';
import { Request } from 'express';
export declare class ProjectController {
    private readonly projectService;
    private readonly request;
    constructor(projectService: ProjectService, request: Request);
    getProjects(routeParameterDTO: any): Promise<any>;
    getProject(routeParameterDTO: any): any;
    createProject(routeParameterDTO: any, projectWriteDTO: any): any;
    addUserToProject(routeParameterDTO: any, projectWriteDTO: any): any;
    addAdminToProject(routeParameterDTO: any, projectWriteDTO: any): any;
    updateProject(routeParameterDTO: any, projectWriteDTO: any): any;
    deleteUserFromProject(routeParameterDTO: any): any;
    getAllIdeasForProject(routeParameterDTO: any): any;
    deleteProject(routeParameterDTO: any): any;
    getUsersForProject(routeParameterDTO: any): any;
    getAdminsForProject(routeParameterDTO: any): any;
}
