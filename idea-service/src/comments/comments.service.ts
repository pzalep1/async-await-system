import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Idea } from 'src/entities/idea.entity';
import { Member } from 'src/entities/member.entity';
import { Project } from 'src/entities/project.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Comment } from 'src/entities/comment.entity';


@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    @InjectRepository(Idea) private ideaRepository: Repository<Idea>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ){}

  async createComment(userId: number, projectId: number, ideaId: number, comment: string, requester: any): Promise<any> {
    const user = await this.userRepository.findOne({userId});
    if (user) {
      const project = await this.projectRepository.findOne({projectId});
      const userAuthorized = await this.memberRepository.findOne({userId: requester.userId, projectId});
      if (project && userAuthorized) {
        const foundIdea = await this.ideaRepository.findOne({ideaId});
        if (foundIdea) {
          return this.commentRepository.insert({userId, ideaId, comment});
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
  async deleteComment(userId: number, projectId: number, ideaId: number, commentId: number, requester: any): Promise<any> {
    const user = await this.userRepository.findOne({userId});
    if (user) {
      const project = await this.projectRepository.findOne({projectId});
      const userAuthorized = await this.memberRepository.findOne({userId: requester.userId, projectId});
      if (project && userAuthorized) {
        const foundIdea = await this.ideaRepository.findOne({ideaId});
        if (foundIdea) {
          return this.commentRepository.delete({commentId});
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
  async updateComment(userId: number, projectId: number, ideaId: number, commentId: string, comment: string, requester: any): Promise<any> {
    const user = await this.userRepository.findOne({userId});
    if (user) {
      const project = await this.projectRepository.findOne({projectId});
      const userAuthorized = await this.memberRepository.findOne({userId: requester.userId, projectId});
      if (project && userAuthorized) {
        const foundIdea = await this.ideaRepository.findOne({ideaId});
        if (foundIdea) {
          return this.commentRepository.update(commentId, { comment });
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
  async getComment(userId: number, projectId: number, ideaId: number, commentId: number, requester: any): Promise<any> {
    const user = await this.userRepository.findOne({userId});
    if (user) {
      const project = await this.projectRepository.findOne({projectId});
      const userAuthorized = await this.memberRepository.findOne({userId: requester.userId, projectId});
      if (project && userAuthorized) {
        const foundIdea = await this.ideaRepository.findOne({ideaId});
        if (foundIdea) {
          return this.commentRepository.find({ commentId });
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