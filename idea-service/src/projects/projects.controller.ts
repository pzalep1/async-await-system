import { Controller, Delete, Get, HttpCode, Param, Patch, Post, Body } from '@nestjs/common';
import { ProjectService } from './projects.service';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  /**
   * Will retrieve all projects for a given user
   */
  @Get('/users/:userId/projects')
  @HttpCode(200)
  // @ApiBadRequestResponse({description: 'The userId is not a valid userId'})
  getUserProjects(@Param() routeParameterDTO: any): any {
    try {
      const userId = routeParameterDTO.userId;
      return this.projectService.getUserProjects(userId);
    } catch(e) {
      console.log(e)
    }
  }
  /**
   * Will retrieve all projects for a given admin
   */
  @Get('/users/:userId/projects')
  @HttpCode(200)
  getAdminProjects(@Param() routeParameterDTO: any): any {
    try {
      const userId = routeParameterDTO.userId;
      return this.projectService.getAdminProjects(userId);
    } catch(e) {
      console.log(e)
    }
  }
  /*
  * Will retrieve a specific project for a user
  */
  @Get('/users/:userId/projects/:projectId')
  @HttpCode(200)
  getProject(@Param() routeParameterDTO: any): any{
    try{
      const userId = routeParameterDTO.userId;
      const projectId = routeParameterDTO.projectId;
      return this.projectService.getProject(userId,projectId);
    }
    catch(e){
      console.log(e);
    }
  }
  /*
  * Will create a project for a given user
  */
  @Post('/users/:userId/projects')
  @HttpCode(201)
  createProject(@Param() routeParameterDTO: any, @Body() projectWriteDTO: any): any{
    try{
      const userId = routeParameterDTO.userId;
      const name = routeParameterDTO.name;
      const description = routeParameterDTO.description;
      const color = routeParameterDTO.color;
      return this.projectService.createProject(userId,name,description,color);
    }
    catch(e){
      console.log(e);
    }
  }
  /*
  * Will add a user to a project
  * !!! ROUTE NEEDED !!!
  */
  @Post('/users/:userId/projects/:projectId/users')
  @HttpCode(201)
  addUserToProject(@Param() routeParameterDTO: any, @Body() projectWriteDTO: any):any{
    try{
      const userId = routeParameterDTO.userId;
      const projectId = routeParameterDTO.projectId;
      return this.projectService.addUserToProject(userId,projectId);
    }
    catch(e){
      console.log(e);
    }
  }
  /*
  * Will add an Admin to a project
  * !!! ROUTE NEEDED !!!
  */
 @Post('/users/:userId/projects/:projectId/admin/users')
 @HttpCode(201)
 addAdminToProject(@Param() routeParameterDTO: any, @Body() projectWriteDTO: any):any{
   try{
     const userId = routeParameterDTO.userId;
     const projectId = routeParameterDTO.projectId;
     return this.projectService.addAdminToProject(userId,projectId);
   }
   catch(e){
     console.log(e);
   }
 }
 /*
  * Will update a project
  */
 @Patch('/users/:userId/projects/:projectId')
 @HttpCode(201)
 updateProject(@Param() routeParameterDTO: any, @Body() projectWriteDTO: any):any{
   try{
     const userId = routeParameterDTO.userId;
     const projectId = routeParameterDTO.projectId;
     const name = routeParameterDTO.name;
     const description = routeParameterDTO.description;
     const color = routeParameterDTO.color;
     return this.projectService.updateProject(userId,projectId,name,description,color);
   }
   catch(e){
     console.log(e);
   }
 }
 /*
 * Deletes a user from a project
 * NEEDS ROUTE
 */
 @Delete('/users/:userId/projects/:projectId/users/:userId')
 @HttpCode(200)
 deleteUserFromProject(@Param() routeParameterDTO: any):any{
   try{
    const userId = routeParameterDTO.userId;
    const projectId = routeParameterDTO.projectId;
    return this.projectService.deleteUsersFromProject(userId,projectId);
   }
   catch(e){
     console.log(e);
   }
 }
 /*
 * Gets ideas for a project
 * Is the route from the wiki right?
 */
 @Get('/users/:userId/projects/:projectId/ideas')
 @HttpCode(200)
 getAllIdeasForProject(@Param() routeParameterDTO: any):any{
    try{
     const projectId = routeParameterDTO.projectId;
     return this.projectService.getAllIdeasForProject(projectId);
    }
    catch(e){
      console.log(e);
    }
  }
  /*
  * Will delete a project
  */
  @Delete('/users/:userId/projects/:projectId')
  @HttpCode(200)
  deleteProject(@Param() routeParameterDTO: any):any{
    try{
      const userId = routeParameterDTO.userId;
      const projectId = routeParameterDTO.projectId;
      return this.projectService.deleteProject(userId,projectId);
    }
    catch(e){
      console.log(e);
    }
  }
}