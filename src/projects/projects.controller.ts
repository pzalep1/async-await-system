import { Controller, Get, HttpCode, Param, Req } from '@nestjs/common';
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
  getHello(@Param() routeParameterDTO: any): any {
    try {
      const userId = routeParameterDTO.userId;
      return this.projectService.getAllProjectsForUser(userId);
    } catch(e) {
      console.log(e)
    }
  }
}