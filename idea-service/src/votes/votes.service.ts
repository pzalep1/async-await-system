import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administers } from 'src/entities/administers.entity';
import { Idea } from 'src/entities/idea.entity';
import { Member } from 'src/entities/member.entity';
import { Project } from 'src/entities/project.entity';
import { User } from 'src/entities/user.entity';
import { Vote } from 'src/entities/vote.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    @InjectRepository(Member) private memberRepository: Repository<Member>,
    @InjectRepository(Administers) private adminRepository: Repository<Administers>,
    @InjectRepository(Idea) private ideaRepository: Repository<Idea>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Vote) private voteRepository: Repository<Vote>,
  ) {

  }
  async getVotesForIdea(userId: number, projectId: number, ideaId: number, requester: any): Promise<any> {
    const user = await this.userRepository.findOne({userId});
    if (user) {
      const project = await this.projectRepository.findOne({projectId});
      const userAuthorized = await this.memberRepository.findOne({userId: requester.userId, projectId});
      const adminAuthorized = await this.adminRepository.findOne({userId: requester.userId, projectId});
      if (project && (userAuthorized || adminAuthorized)) {
        const foundIdea = await this.ideaRepository.findOne({ideaId});
        if (foundIdea) {
          try {
            return this.voteRepository.find({ideaId});
          } catch (e) {
            throw new HttpException('User has already voted', HttpStatus.CONFLICT);
          }
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
  async addVote(userId: number, projectId: number, ideaId: number, vote: boolean, requester: any): Promise<any> {
    const user = await this.userRepository.findOne({userId});
    if (user) {
      const project = await this.projectRepository.findOne({projectId});
      const userAuthorized = await this.memberRepository.findOne({userId: requester.userId, projectId});
      const adminAuthorized = await this.adminRepository.findOne({userId: requester.userId, projectId});
      if (project && (userAuthorized || adminAuthorized)) {
        const foundIdea = await this.ideaRepository.findOne({ideaId});
        if (foundIdea) {
          const userVote = await this.voteRepository.findOne({userId, ideaId});
          if (!userVote) {
            return this.voteRepository.insert({userId, ideaId, vote});
          } else if (vote !== userVote.vote) {
            return this.voteRepository.update({userId, ideaId}, { vote: vote })
          } else {
            throw new HttpException('Idea has already been voted on,', HttpStatus.CONFLICT);
          }
      
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
  async deleteVote(userId: number, projectId: number, ideaId: number, voteId: number, requester: any): Promise<any> {
    const user = await this.userRepository.findOne({userId});
    if (user) {
      const project = await this.projectRepository.findOne({projectId});
      const userAuthorized = await this.memberRepository.findOne({userId: requester.userId, projectId});
      const adminAuthorized = await this.adminRepository.findOne({userId: requester.userId, projectId});
      if (project && (userAuthorized || adminAuthorized)) {
        const foundIdea = await this.ideaRepository.findOne({ideaId});
        if (foundIdea) {
          return this.voteRepository.delete({voteId});
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
  async updateVote(userId: number, projectId: number, ideaId: number, voteId: number, vote: boolean, requester: any): Promise<any> {
    const user = await this.userRepository.findOne({userId});
    if (user) {
      const project = await this.projectRepository.findOne({projectId});
      const userAuthorized = await this.memberRepository.findOne({userId: requester.userId, projectId});
      const adminAuthorized = await this.adminRepository.findOne({userId: requester.userId, projectId});
      if (project && (userAuthorized || adminAuthorized)) {
        const foundIdea = await this.ideaRepository.findOne({ideaId});
        if (foundIdea) {
          return this.voteRepository.update(voteId, {vote});
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