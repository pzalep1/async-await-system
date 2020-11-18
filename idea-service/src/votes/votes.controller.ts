import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Patch, Post, Scope, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { VotesService } from './votes.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Controller({scope: Scope.REQUEST})
export class VotesController {
  constructor(
    private readonly voteService: VotesService,
    @Inject(REQUEST) private readonly request: Request,
    ) {}

  /*
  * Will get all votes for an Idea
  */
  @Get('/users/:userId/projects/:projectId/ideas/:ideaId/votes')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getVotes(@Param() routeParameterDTO:any): any{
    const projectId = routeParameterDTO.projectId;
    const ideaId = routeParameterDTO.ideaId;
    const userId = routeParameterDTO.userId;
    const requester = this.request.user;
    return this.voteService.getVotesForIdea(userId, projectId, ideaId, requester);
  }
  /*
  * Will post a vote to an idea
  */
  @Post('/users/:userId/projects/:projectId/ideas/:ideaId/votes')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  addVote(@Param() routeParameterDTO:any, @Body() voteWriteDTO: any): any{
    const userId = routeParameterDTO.userId;
    const projectId = routeParameterDTO.projectId;
    const ideaId = routeParameterDTO.ideaId;
    const requester = this.request.user;
    const vote = voteWriteDTO.vote;
    return this.voteService.addVote(userId, projectId, ideaId, vote, requester);
  }
  /*
  * Will delete a user's vote from an idea
  */
  @Delete('/users/:userId/projects/:projectId/ideas/:ideaId/votes/:voteId')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  deleteVote(@Param() routeParameterDTO:any): any{
    const userId = routeParameterDTO.userId;
    const projectId = routeParameterDTO.projectId;
    const ideaId = routeParameterDTO.ideaId;
    const voteId = routeParameterDTO.voteId;
    const requester = this.request.user;
    return this.voteService.deleteVote(userId,projectId,ideaId,voteId, requester);
  }
  /*
  * Will update a user's vote on an idea
  */
 @Patch('/users/:userId/projects/:projectId/ideas/:ideaId/votes/:voteId')
 @HttpCode(201)
 @UseGuards(JwtAuthGuard)
 updateVote(@Param() routeParameterDTO:any, @Body() voteWriteDTO: any):any{
   try{
    const userId = routeParameterDTO.userId;
    const projectId = routeParameterDTO.projectId;
    const ideaId = routeParameterDTO.ideaId;
    const voteId = routeParameterDTO.voteId;
    const vote = voteWriteDTO.vote;
    const requester = this.request.user;
    return this.voteService.updateVote(userId,projectId,ideaId,voteId,vote, requester);
   }
   catch(e){
     console.log(e);
   }
 }
}