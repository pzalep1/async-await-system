import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Administers } from '../entities/administers.entity';
import { Member } from 'src/entities/member.entity';
import { Idea } from 'src/entities/idea.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(Administers) private adminRepository: Repository<Administers>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    @InjectRepository(Idea) private ideaRepository: Repository<Idea>,
    
    ) {}
  
    /**
     * Get the projects that a given user is an admin for
     * @param userId The id of the user
     */
  async getAdminProjects(userId: number): Promise<any> {
    const projectIds = await this.adminRepository.find({userId});
    const projects = [];
    for (let i = 0; i < projectIds.length; i++) {
      const id = projectIds[i].projectId;
      const project = await this.projectRepository.findOne({ projectId: id });
      projects.push(project);
    }
    return projects;
  }
  /**
   * Get the projects that a given user is a member of
   * @param userId The id of the user
   */
  async getUserProjects(userId: number): Promise<any> {
    const projectIds = await this.memberRepository.find({ userId });
    const projects = [];
    for (let i = 0; i < projectIds.length; i++) {
      const id = projectIds[i].projectId;
      const project = await this.projectRepository.findOne({ projectId: id });
      projects.push(project);
    }
    return projects;
  }
  /**
   * Retrieves a specific project
   * @param projectId The id of the project to be retrieved
   */
  async getProject(projectId: string): Promise<any> {
    const project = await this.projectRepository.findOne(projectId);
    return project;
  }
  /**
   * Creates a project
   * @param userId The id of the user that is creating the project
   * @param name The name of the project
   * @param description The description of the project
   * @param color The color that the user has assigned to the project
   */
  async createProject(userId: number, name: string, description: string, color: string): Promise<any> {
    const project = await this.projectRepository.insert({ name, description, color});
    const projectId = project.identifiers[0].projectId
    this.adminRepository.insert({userId, projectId});
    return;
  }
  /**
   * Adds a user as a member of a project
   * @param userId The id of the user to add to the project
   * @param projectId The id of the project to add the user to
   */
  addUserToProject(userId: number, projectId: number): any {
    this.memberRepository.insert({userId, projectId});
  }
  /**
   * Adds a user as an admin of a project
   * @param userId The id of the user to add as an admin to a project
   * @param projectId The id of the project to add the user to
   */
  addAdminToProject(userId: number, projectId: number): any {
    this.adminRepository.insert({userId, projectId});
  }
  /**
   * 
   * @param projectId The id of the project to be updated
   * @param name The name of the project to be updated
   * @param description The description of the project to be updated
   * @param color The color of the project to be updated
   */
  updateProject(projectId: number, name: string, description: string, color: string): any {
    this.projectRepository.update(projectId, {name, description, color});
  }
  /**
   * Removes a user from the project
   * @param userId The id of the user to delete from the project
   * @param projectId The id of the project to delete the user from
   */
  deleteUsersFromProject(userId: number, projectId: number): any {
    this.memberRepository.delete({ userId, projectId })
  }
  /**
   * Gets all the given ideas for a project
   * @param projectId The projectId to get the ideas for
   */
  getAllIdeasForProject(projectId: number): any {
    this.ideaRepository.createQueryBuilder('Idea').where('projectId = :projectId', { projectId: projectId }).getMany();
  }
  /**
   * Delete a project as well as it's admin and member references
   * @param projectId The projectId of the project to get deleted
   */
  deleteProject(projectId: number): any {
    this.projectRepository.delete(projectId);
    this.memberRepository.delete(projectId);
    this.adminRepository.delete(projectId)
  }
}