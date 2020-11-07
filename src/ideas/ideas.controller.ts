import { Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { IdeaService } from './ideas.service';

@Controller()
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  /**
   * Will create an Idea
   */
  @Post('/users/:userId/projects/:projectId/ideas')
  @HttpCode(201)
  createIdea(@Param() routeParameterDTO: any): any {
    try {
      const userId = routeParameterDTO.userId;
      const projectId = routeParameterDTO.projectId;
      const idea = routeParameterDTO.idea;
      const timeStamp = routeParameterDTO.timeStamp;
      return this.ideaService.createIdea(userId,projectId,idea,timeStamp);
    }
    catch(e) {
      console.log(e)
    }
  }
  /*
  * Will update an idea
  */
 @Patch('/users/:userId/projects/:projectId/ideas/:ideaId')
 @HttpCode(201)
 updateIdea(@Param() routeParameterDTO: any):any{
   try{
      const userId = routeParameterDTO.userId;
      const projectId = routeParameterDTO.projectId;
      const idea = routeParameterDTO.ideaId;
      const timeStamp = routeParameterDTO.timeStamp;
      return this.ideaService.updateIdea(userId,projectId,idea,timeStamp);
   }
   catch(e){
     console.log(e);
   }
 }
 /*
 *  Get specific idea
 */
  @Get('/users/:userId/projects/:projectId/ideas/:ideaId')
  @HttpCode(200)
  getIdea(@Param() routeParameterDTO: any): any{
    try{  
      const userId = routeParameterDTO.userId;
      const projectId = routeParameterDTO.projectId;
      const ideaId = routeParameterDTO.ideaId;
      return this.ideaService.getIdea(userId,projectId,ideaId);
    }
    catch(e){
      console.log(e);
    }
  }
  /*
  * Will change state of an Idea
  */
  @Post('/users/:userId/projects/:projectId/ideas/:ideaId/status')
  @HttpCode(201)
  changeState(@Param() routeParameterDTO: any): any{
    try{
      const projectId = routeParameterDTO.projectId;
      const ideaId = routeParameterDTO.ideaId;
      const newState = routeParameterDTO.newState;
      return this.ideaService.changeStateOfIdea(projectId,ideaId,newState);
    }
    catch(e){
      console.log(e);
    }
  }
  /*
  * Will delete an Idea
  */
  @Delete('/users/:userId/projects/:projectId/ideas/:ideaId')
  @HttpCode(200)
  deleteIdea(@Param() routeParameterDTO: any): any{
    try{
      const projectId = routeParameterDTO.projectId;
      const ideaId = routeParameterDTO.ideaId;
      return this.ideaService.deleteIdea(projectId,ideaId);
    }
    catch(e){
      console.log(e);
    }
  }
  /*
  * Will retrieve all comments for an Idea
  */
  @Get('/users/:userId/projects/:projectId/ideas/:ideaId/comments')
  @HttpCode(200)
  getComments(@Param() routeParameterDTO: any): any{
    try{
      const projectId = routeParameterDTO.projectId;
      const ideaId = routeParameterDTO.ideaId;
      return this.ideaService.getCommentsForIdea(projectId,ideaId);
    }
    catch(e){
      console.log(e);
    }
  }
}