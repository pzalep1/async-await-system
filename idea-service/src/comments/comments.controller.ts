import { Controller, Delete, Get, HttpCode, Param, Patch, Post, Body, UseGuards, Scope, Inject } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { CommentService } from './comments.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
@Controller({ scope: Scope.REQUEST })
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    @Inject(REQUEST) private readonly request: Request,
    ) {}

  /**
   * Will generate a comment for a idea
   */
  @Post('/users/:userId/projects/:projectId/ideas/:ideaId/comments')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  createComment(@Param() routeParameterDTO: any, @Body() commentWriteDTO: any): any {
    const requester = this.request.user;
    const userId = routeParameterDTO.userId;
    const projectId = routeParameterDTO.projectId;
    const ideaId = routeParameterDTO.ideaId;
    const comment = commentWriteDTO.comment;
    return this.commentService.createComment(userId,projectId,ideaId,comment,requester);
  }
  /*
  * Will delete a comment
  */
  @Delete('/users/:userId/projects/:projectId/ideas/:ideaId/comments/:commentId')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  deleteComment(@Param() routeParameterDTO: any): any{
    const requester = this.request.user;
    const commentId = routeParameterDTO.commentId;
    const userId = routeParameterDTO.userId;
    const projectId = routeParameterDTO.projectId;
    const ideaId = routeParameterDTO.ideaId;
    return this.commentService.deleteComment(userId,projectId,ideaId,commentId,requester);
  }
  /*
  * Will update a comment
  */
  @Patch('/users/:userId/projects/:projectId/ideas/:ideaId/comments/:commentId')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  updateComment(@Param() routeParameterDTO: any, @Body() commentWriteDTO: any): any {
    const requester = this.request.user;
    const userId = routeParameterDTO.userId;
    const projectId = routeParameterDTO.projectId;
    const ideaId = routeParameterDTO.ideaId;
    const commentId = routeParameterDTO.commentId;
    const comment = commentWriteDTO.comment;
    return this.commentService.updateComment(userId, projectId, ideaId, commentId, comment, requester);
  }
  /*
  * Will retrieve a single comment
  */
  @Get('/users/:userId/projects/:projectId/ideas/:ideaId/comments/:commentId')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getComment(@Param() routeParameterDTO:any):any{
    const requester = this.request.user;
    const userId = routeParameterDTO.userId;
    const projectId = routeParameterDTO.projectId;
    const ideaId = routeParameterDTO.ideaId;
    const comment = routeParameterDTO.commentId;
    return this.commentService.getComment(userId,projectId,ideaId,comment,requester);
  }
}