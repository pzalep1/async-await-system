import { Injectable } from '@nestjs/common';


@Injectable()
export class CommentService {
  constructor(){}

  createComment(userId: string, projectId: string, ideaId: string, comment: string): any {
    
  }
  deleteComment(userId: string, projectId: string, ideaId: string): any {
   
  }
  updateComment(userId: string, projectId: string, ideaId: string, commentId: string, comment: string): any {
    
  }
  getComment(userId: string, projectId: string, ideaId: string, comment: string): any {
    
  }
}