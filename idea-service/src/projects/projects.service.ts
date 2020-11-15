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
    @InjectRepository(Idea) private ideaRepository: Repository<Idea>
    ) {}
  
    /**
     * 
     * @param userId 
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
  async getProject(userId: string,projectId: string): Promise<any> {
    const project = await this.projectRepository.findOne(projectId);
    return project;
  }
  async createProject(userId: number, name: string, description: string, color: string): Promise<any> {
    const project = await this.projectRepository.insert({ name, description, color});
    const projectId = project.identifiers[0].projectId
    this.adminRepository.insert({userId, projectId});
    return;
  }
  addUserToProject(userId: number, projectId: number): any {
    this.memberRepository.insert({userId, projectId});
  }
  addAdminToProject(userId: number, projectId: number): any {
    this.adminRepository.insert({userId, projectId});
  }
  updateProject(userId: number, projectId: number, name: string, description: string, color: string): any {
    this.projectRepository.update(projectId, {name, description, color});
  }
  deleteUsersFromProject(userId: number, projectId: number): any {
    this.memberRepository.delete({ userId, projectId })
  }
  getAllIdeasForProject(projectId: number): any {
    this.ideaRepository.createQueryBuilder('Idea').where('projectId = :projectId', { projectId: projectId }).getMany();
  }
  deleteProject(userId: number, projectId: number): any {
    this.projectRepository.delete(projectId);
    this.memberRepository.delete(projectId);
    this.adminRepository.delete(projectId)
  }
}