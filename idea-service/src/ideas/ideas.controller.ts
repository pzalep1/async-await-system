import { Controller, Delete, Get, HttpCode, Param, Patch, Post, Body, UseGuards, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { IdeaService } from './ideas.service';

@Controller({ scope: Scope.REQUEST })
export class IdeaController {
  constructor(
    private readonly ideaService: IdeaService,
    @Inject(REQUEST) private readonly request: Request) {}

  /**
   * Will create an Idea
   */
  @Post('/users/:userId/projects/:projectId/ideas')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  createIdea(@Param() routeParameterDTO: any, @Body() ideaWriteDTO: any): any {
    const userId = routeParameterDTO.userId;
    const projectId = routeParameterDTO.projectId;
    const idea = ideaWriteDTO.idea;
    return this.ideaService.createIdea(userId,projectId,idea);
  }
  /*
  * Will update an idea
  */
 @Patch('/users/:userId/projects/:projectId/ideas/:ideaId')
 @HttpCode(201)
 @UseGuards(JwtAuthGuard)
 updateIdea(@Param() routeParameterDTO: any, @Body() ideaWriteDTO: any):any{
    const userId = routeParameterDTO.userId;
    const projectId = routeParameterDTO.projectId;
    const ideaId = routeParameterDTO.ideaId;
    const idea = ideaWriteDTO.idea;
    return this.ideaService.updateIdea(userId,projectId,ideaId, idea);
 }
 /*
 *  Get specific idea
 */
  @Get('/users/:userId/projects/:projectId/ideas/:ideaId')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getIdea(@Param() routeParameterDTO: any): any{
    const userId = routeParameterDTO.userId;
    const projectId = routeParameterDTO.projectId;
    const ideaId = routeParameterDTO.ideaId;
    return this.ideaService.getIdea(userId,projectId,ideaId);
  }
  /*
  * Will change state of an Idea
  */
  @Post('/users/:userId/projects/:projectId/ideas/:ideaId/status')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  changeState(@Param() routeParameterDTO: any, @Body() ideaWriteDTO: any): any{
    const requester = this.request.user;
    const userId = routeParameterDTO.userId;
    const projectId = routeParameterDTO.projectId;
    const ideaId = routeParameterDTO.ideaId;
    const newState = ideaWriteDTO.newState;
    return this.ideaService.changeStateOfIdea(userId, projectId,ideaId,newState, requester);
  }
  /*
  * Will delete an Idea
  */
  @Delete('/users/:userId/projects/:projectId/ideas/:ideaId')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  deleteIdea(@Param() routeParameterDTO: any): any{
    const userId = routeParameterDTO.userId;
    const projectId = routeParameterDTO.projectId;
    const ideaId = routeParameterDTO.ideaId;
    return this.ideaService.deleteIdea(userId, projectId,ideaId);
  }
  /*
  * Will retrieve all comments for an Idea
  */
  @Get('/users/:userId/projects/:projectId/ideas/:ideaId/comments')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getComments(@Param() routeParameterDTO: any): any{
    const userId = routeParameterDTO.userId;
    const projectId = routeParameterDTO.projectId;
    const ideaId = routeParameterDTO.ideaId;
    return this.ideaService.getCommentsForIdea(userId,projectId,ideaId);
  }
}