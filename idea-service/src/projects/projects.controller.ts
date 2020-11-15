import { Controller, Delete, Get, HttpCode, Param, Patch, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { ProjectService } from './projects.service';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  /**
   * Will retrieve all projects for a given admin
   */
  @Get('/users/:userId/projects')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async getProjects(@Param() routeParameterDTO: any): Promise<any> {
    const userId = routeParameterDTO.userId;
    const userProjects = await this.projectService.getUserProjects(userId);
    const adminProjects = await this.projectService.getAdminProjects(userId);
    return { member: userProjects, administers: adminProjects };
  }
  /*
  * Will retrieve a specific project for a user
  */
  @Get('/users/:userId/projects/:projectId')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getProject(@Param() routeParameterDTO: any): any{
      const userId = routeParameterDTO.userId;
      const projectId = routeParameterDTO.projectId;
      return this.projectService.getProject(userId,projectId);
  }
  /*
  * Will create a project for a given user
  */
  @Post('/users/:userId/projects')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  createProject(@Param() routeParameterDTO: any, @Body() projectWriteDTO: any): any{
    const userId = routeParameterDTO.userId;
    const name = projectWriteDTO.name;
    const description = projectWriteDTO.description;
    const color = projectWriteDTO.color;
    return this.projectService.createProject(userId,name,description,color);
  }
  /*
  * Will add a user to a project
  * !!! ROUTE NEEDED !!!
  */
  @Post('/users/:userId/projects/:projectId/users')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  addUserToProject(@Param() routeParameterDTO: any, @Body() projectWriteDTO: any):any{
    const userId = routeParameterDTO.userId;
    const projectId = routeParameterDTO.projectId;
    return this.projectService.addUserToProject(userId,projectId);
  }
  /*
  * Will add an Admin to a project
  * !!! ROUTE NEEDED !!!
  */
 @Post('/users/:userId/projects/:projectId/admin/users')
 @HttpCode(201)
 @UseGuards(JwtAuthGuard)
 addAdminToProject(@Param() routeParameterDTO: any, @Body() projectWriteDTO: any):any{
    const userId = routeParameterDTO.userId;
    const projectId = routeParameterDTO.projectId;
    return this.projectService.addAdminToProject(userId,projectId);
 }
 /*
  * Will update a project
  */
 @Patch('/users/:userId/projects/:projectId')
 @HttpCode(201)
 @UseGuards(JwtAuthGuard)
 updateProject(@Param() routeParameterDTO: any, @Body() projectWriteDTO: any):any{
    const userId = routeParameterDTO.userId;
    const projectId = routeParameterDTO.projectId;
    const name = routeParameterDTO.name;
    const description = routeParameterDTO.description;
    const color = routeParameterDTO.color;
    return this.projectService.updateProject(userId,projectId,name,description,color);
 }
 /*
 * Deletes a user from a project
 * NEEDS ROUTE
 */
 @Delete('/users/:userId/projects/:projectId/users/:userId')
 @HttpCode(200)
 @UseGuards(JwtAuthGuard)
 deleteUserFromProject(@Param() routeParameterDTO: any):any{
  const userId = routeParameterDTO.userId;
  const projectId = routeParameterDTO.projectId;
  return this.projectService.deleteUsersFromProject(userId,projectId);
 }
 /*
 * Gets ideas for a project
 * Is the route from the wiki right?
 */
 @Get('/users/:userId/projects/:projectId/ideas')
 @HttpCode(200)
 @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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