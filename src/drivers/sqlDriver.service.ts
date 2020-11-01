import { Injectable } from '@nestjs/common';

@Injectable()
export class SqlDriver {
    // Functions for users
  createUser() {
    throw new Error('Method not implemented');
  }
  updateUser() {
    throw new Error('Method not implemented');
  }
  deleteUser() {
    throw new Error('Method not implemented');
  }

  // Functions for projects
  getAllProjectsForAdmin(userId: string) {
    throw new Error('Method not implemented');
  }
  getAllProjectsForUser(userId: string) {
    throw new Error('Method not implemented');
  }
  getProject(projectId: string) {
    throw new Error('Method not implemented');
  }
  createProject(userId: string, name: string, description: string, color: string) {
    throw new Error('Method not implemented');
  }
  addUserToProject(userId: string, projectId: string) {
    throw new Error('Method not implemented');
  }
  addAdminToProject(userId: string, projectId: string) {
    throw new Error('Method not implemented');
  }
  deleteUsersFromProject(userId: string, projectId: string){
    throw new Error('Method not implemented');
  }
  getAllIdeasForProject(projectId: string) {
    throw new Error('Method not implemented');
  }

  // Functions for ideas
  createIdea(userId: string, projectId: string, idea: string, timestamp: string) {
    throw new Error('Method not implemented');
  }
  changeStateOfIdea(projectId: string, ideaId: string, newState: string){
    throw new Error('Method not implemented');
  }
  deleteIdea(projectId: string, ideaId: string) {
    throw new Error('Method not implemented');
  }
  getCommentsForIdea(projectId: string, ideaId: string) {
    throw new Error('Method not implemented');
  }
  getVotesForIdea(projectId: string, ideaId: string) {
    throw new Error('Method not implemented');
  }

  // Functions for comments
  createComment(userId: string, projectId: string, ideaId: string, comment: string) {
    throw new Error('Method not implemented');
  }
  deleteComment(userId: string, projectId: string, ideaId: string) {
    throw new Error('Method not implemented');
  }

  // Functions for votes
  addVote(userId: string, vote: boolean) {
    throw new Error('Method not implemented');
  }
  deleteVote(userId: string, projectId: string, ideaId: string, voteId: string) {
    throw new Error('Method not implemented');
  }
  updateVote(userId: string, projectId: string, ideaId: string, voteId: string, vote: boolean) {
    throw new Error('Method not implemented');
  }


}