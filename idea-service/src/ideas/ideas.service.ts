import { Injectable } from '@nestjs/common';

@Injectable()
export class IdeaService {
  constructor() {}

  createIdea(userId: string, projectId: string, idea: string, timestamp: string): any {
    
  }
  updateIdea(userId: string, projectId: string, idea: string, timestamp: string): any {
    
  }
  getIdea(userId: string, projectId: string, ideaId: string): any {
    
  }
  changeStateOfIdea(projectId: string, ideaId: string, newState: string): any {
    
  }
  deleteIdea(projectId: string, ideaId: string): any {
    
  }
  getCommentsForIdea(projectId: string, ideaId: string): any {
    
  }
}