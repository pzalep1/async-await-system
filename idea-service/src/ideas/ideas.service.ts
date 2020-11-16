import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administers } from 'src/entities/administers.entity';
import { Idea } from 'src/entities/idea.entity';
import { Member } from 'src/entities/member.entity';
import { Project } from 'src/entities/project.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(Administers) private adminRepository: Repository<Administers>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    @InjectRepository(Idea) private ideaRepository: Repository<Idea>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async createIdea(userId: number, projectId: number, idea: string): Promise<any> {
    const user = await this.userRepository.findOne({userId});
    if (user) {
      const project = await this.projectRepository.findOne({projectId});
      if (project) {
        const timestamp = Date.now().toString();
        return await this.ideaRepository.insert({userId, projectId, idea, timestamp});
      } else {
        throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  async updateIdea(userId: number, projectId: number, ideaId: number, idea: string): Promise<any> {
    const user = await this.userRepository.findOne({userId});
    if (user) {
      const project = await this.projectRepository.findOne({projectId});
      if (project) {
        const foundIdea = await this.ideaRepository.findOne({ideaId});
        if (foundIdea) {
          return await this.ideaRepository.update(ideaId, { idea, timestamp: Date.now().toString()});
        } else {
          throw new HttpException('Idea not found', HttpStatus.NOT_FOUND);
        }
      } else {
        throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  /**
   * 
   * @param userId 
   * @param projectId 
   * @param ideaId 
   */
  async getIdea(userId: number, projectId: number, ideaId: number): Promise<any> {
    const user = await this.userRepository.findOne({userId});
    if (user) {
      const project = await this.projectRepository.findOne({projectId});
      if (project) {
        const foundIdea = await this.ideaRepository.findOne({ideaId});
        if (!foundIdea) {
          throw new HttpException('Idea not found', HttpStatus.NOT_FOUND);
        } else {
          return foundIdea;
        }
      } else {
        throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  /**
   * 
   * @param userId 
   * @param projectId 
   * @param ideaId 
   * @param newState 
   */
  async changeStateOfIdea(userId: number, projectId: number, ideaId: number, newState: string, requester: any): Promise<any> {
    const user = await this.userRepository.findOne({userId});
    if (user) {
      const project = await this.projectRepository.findOne({projectId});
      const userAuthorized = await this.adminRepository.findOne({userId: requester.userId, projectId});
      if (project && userAuthorized) {
        const foundIdea = await this.ideaRepository.findOne({ideaId});
        if (foundIdea) {
          return await this.ideaRepository.update(ideaId, { state: newState, timestamp: Date.now().toString()});
        } else {
          throw new HttpException('Idea not found', HttpStatus.NOT_FOUND);
        }
      } else {
        throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  /**
   * 
   * @param userId 
   * @param projectId 
   * @param ideaId 
   */
  async deleteIdea(userId: number, projectId: number, ideaId: number): Promise<any> {
    const user = await this.userRepository.findOne({userId});
    if (user) {
      const project = await this.projectRepository.findOne({projectId});
      if (project) {
        const foundIdea = await this.ideaRepository.findOne({ideaId});
        if (foundIdea) {
          return await this.ideaRepository.delete(ideaId);
        } else {
          throw new HttpException('Idea not found', HttpStatus.NOT_FOUND);
        }
      } else {
        throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  /**
   * 
   * @param projectId 
   * @param ideaId 
   */
  async getCommentsForIdea(userId: number, projectId: number, ideaId: number): Promise<any> {
    const user = await this.userRepository.findOne({userId});
    if (user) {
      const project = await this.projectRepository.findOne({projectId});
      if (project) {
        const foundIdea = await this.ideaRepository.findOne({ideaId});
        if (foundIdea) {
          return await this.commentRepository.find({ideaId});
        } else {
          throw new HttpException('Idea not found', HttpStatus.NOT_FOUND);
        }
      } else {
        throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}