import { Administers } from 'src/entities/administers.entity';
import { Idea } from 'src/entities/idea.entity';
import { Member } from 'src/entities/member.entity';
import { Project } from 'src/entities/project.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
export declare class IdeaService {
    private projectRepository;
    private adminRepository;
    private memberRepository;
    private ideaRepository;
    private userRepository;
    private commentRepository;
    constructor(projectRepository: Repository<Project>, adminRepository: Repository<Administers>, memberRepository: Repository<Member>, ideaRepository: Repository<Idea>, userRepository: Repository<User>, commentRepository: Repository<Comment>);
    createIdea(userId: number, projectId: number, idea: string): Promise<any>;
    updateIdea(userId: number, projectId: number, ideaId: number, idea: string): Promise<any>;
    getIdea(userId: number, projectId: number, ideaId: number): Promise<any>;
    changeStateOfIdea(userId: number, projectId: number, ideaId: number, newState: string, requester: any): Promise<any>;
    deleteIdea(userId: number, projectId: number, ideaId: number): Promise<any>;
    getCommentsForIdea(userId: number, projectId: number, ideaId: number): Promise<any>;
}
