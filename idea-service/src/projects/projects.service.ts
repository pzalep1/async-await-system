import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Administers } from '../entities/administers.entity';
import { Member } from 'src/entities/member.entity';
import { Idea } from 'src/entities/idea.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(Administers) private adminRepository: Repository<Administers>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    @InjectRepository(Idea) private ideaRepository: Repository<Idea>,
    @InjectRepository(User) private userRepository: Repository<User>,
    ) {}
  
    /**
     * Get the projects that a given user is an admin for
     * @param userId The id of the user
     */
  async getAdminProjects(userId: number): Promise<any> {
    const user = await this.userRepository.findOne({userId});
    if (user) {
      const projectIds = await this.adminRepository.find({userId});
      const projects = [];
      for (let i = 0; i < projectIds.length; i++) {
        const id = projectIds[i].projectId;
        const project = await this.projectRepository.findOne({ projectId: id });
        projects.push(project);
      }
      return projects;
    } else {
      throw new HttpException('UserId not found', HttpStatus.NOT_FOUND);
    }
  }
  /**
   * Get the projects that a given user is a member of
   * @param userId The id of the user
   */
  async getUserProjects(userId: number): Promise<any> {
    const user = await this.userRepository.findOne({userId});
    if (user) {
      const projectIds = await this.memberRepository.find({ userId });
      const projects = [];
      for (let i = 0; i < projectIds.length; i++) {
        const id = projectIds[i].projectId;
        const project = await this.projectRepository.findOne({ projectId: id });
        projects.push(project);
      }
      return projects;
    } else {
      throw new HttpException('UserId not found', HttpStatus.NOT_FOUND);
    }
  }
  /**
   * Retrieves a specific project
   * @param projectId The id of the project to be retrieved
   */
  async getProject(projectId: string): Promise<any> {
    const project = await this.projectRepository.findOne(projectId);
    if (project) {
      return project;
    } else {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
  }
  /**
   * Creates a project
   * @param userId The id of the user that is creating the project
   * @param name The name of the project
   * @param description The description of the project
   * @param color The color that the user has assigned to the project
   */
  async createProject(userId: number, name: string, description: string, color: string): Promise<any> {
    if (name && description && color) {
      const project = await this.projectRepository.insert({ name, description, color});
      const projectId = project.identifiers[0].projectId
      this.adminRepository.insert({userId, projectId});
      return projectId;
    } else {
      throw new HttpException('Name, description, and color must be defined', HttpStatus.BAD_REQUEST);
    }
  }
  /**
   * Adds a user as a member of a project
   * @param userId The id of the user to add to the project
   * @param projectId The id of the project to add the user to
   */
  async addUserToProject(userId: number, projectId: number): Promise<any> {
    console.log(userId);
    const user = await this.userRepository.findOne({userId});
    if (user) {
      return this.memberRepository.insert({userId, projectId});
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  /**
   * Adds a user as an admin of a project
   * @param userId The id of the user to add as an admin to a project
   * @param projectId The id of the project to add the user to
   */
  async addAdminToProject(userId: number, projectId: number): Promise<any> {
    const user = await this.userRepository.findOne({userId});
    if (user) {
      this.adminRepository.insert({userId, projectId});
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  /**
   * 
   * @param projectId The id of the project to be updated
   * @param name The name of the project to be updated
   * @param description The description of the project to be updated
   * @param color The color of the project to be updated
   */
  async updateProject(projectId: number, name: string, description: string, color: string): Promise<any> {
    const project = await this.projectRepository.findOne(projectId);
    if (project) {
      return this.projectRepository.update(projectId, {name, description, color});
    } else {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
  }
  /**
   * Removes a user from the project
   * @param userId The id of the user to delete from the project
   * @param projectId The id of the project to delete the user from
   */
  async deleteUsersFromProject(userId: number, projectId: number): Promise<any> {
    const user = await this.userRepository.findOne({userId});
    if (user) {
      this.memberRepository.delete({ userId, projectId })
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  /**
   * Gets all the given ideas for a project
   * @param projectId The projectId to get the ideas for
   */
  async getAllIdeasForProject(projectId: number): Promise<any> {
    const project = await this.projectRepository.findOne(projectId);
    if (project) {
      const ideas = await this.ideaRepository.createQueryBuilder('Idea').where('projectId = :projectId', { projectId: projectId }).getMany();
      return ideas;
    } else {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
  }
  /**
   * Delete a project as well as it's admin and member references
   * @param projectId The projectId of the project to get deleted
   */
  async deleteProject(projectId: number): Promise<any> {
    // TO DO ADD AUTHORIZATIONS
    const project = await this.projectRepository.findOne(projectId);
    if (project) {
      this.projectRepository.delete(projectId);
      this.memberRepository.delete({projectId: projectId});
      this.adminRepository.delete({projectId: projectId});
    } else {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
  }

  async getUsersForProject(projectId: number): Promise<any> {
    const project = await this.projectRepository.findOne(projectId);
    if (project) {
      return await this.memberRepository.find({projectId: projectId});
    } else {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
  }

  async getAdminsForProject(projectId: number): Promise<any> {
    const project = await this.projectRepository.findOne(projectId);
    if (project) {
      const users = await this.adminRepository.find({projectId: projectId});
      return users;
    } else {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
  }
}