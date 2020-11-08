import { Controller, Delete, Get, HttpCode, Param, Patch, Post } from 'idea-service/node_modules/@nestjs/common';
import { VotesService } from './votes.service';

@Controller()
export class VotesController {
  constructor(private readonly voteService: VotesService) {}

  /*
  * Will get all votes for an Idea
  */
  @Get('/users/:userId/projects/:projectId/ideas/:ideaId/votes')
  @HttpCode(200)
  getVotes(@Param() routeParameterDTO:any): any{
    try{
      const projectId = routeParameterDTO.projectId;
      const ideaId = routeParameterDTO.ideaId;
      return this.voteService.getVotesForIdea(projectId,ideaId);
    }
    catch(e){
      console.log(e);
    }
  }
  /*
  * Will post a vote to an idea
  */
  @Post('/users/:userId/projects/:projectId/ideas/votes/:voteId')
  @HttpCode(201)
  addVote(@Param() routeParameterDTO:any): any{
    try{
      const userId = routeParameterDTO.userId;
      const vote = routeParameterDTO.vote;
      return this.voteService.addVote(userId,vote);
    }
    catch(e){
      console.log(e);
    }
  }
  /*
  * Will delete a user's vote from an idea
  */
  @Delete('/users/:userId/projects/:projectId/ideas/:ideaId/votes/:voteId')
  @HttpCode(200)
  deleteVote(@Param() routeParameterDTO:any): any{
    try{
      const userId = routeParameterDTO.userId;
      const projectId = routeParameterDTO.projectId;
      const ideaId = routeParameterDTO.ideaId;
      const voteId = routeParameterDTO.voteId;
      return this.voteService.deleteVote(userId,projectId,ideaId,voteId);
    }
    catch(e){
      console.log(e);
    }
  }
  /*
  * Will update a user's vote on an idea
  */
 @Patch('/users/:userId/projects/:projectId/ideas/:ideaId/votes/:voteId')
 @HttpCode(201)
 updateVote(@Param() routeParameterDTO:any):any{
   try{
    const userId = routeParameterDTO.userId;
    const projectId = routeParameterDTO.projectId;
    const ideaId = routeParameterDTO.ideaId;
    const voteId = routeParameterDTO.voteId;
    const vote = routeParameterDTO.vote;
    return this.voteService.updateVote(userId,projectId,ideaId,voteId,vote);
   }
   catch(e){
     console.log(e);
   }
 }
}