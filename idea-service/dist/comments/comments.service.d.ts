import { Idea } from 'src/entities/idea.entity';
import { Member } from 'src/entities/member.entity';
import { Project } from 'src/entities/project.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { Comment } from 'src/entities/comment.entity';
export declare class CommentService {
    private projectRepository;
    private memberRepository;
    private ideaRepository;
    private userRepository;
    private commentRepository;
    constructor(projectRepository: Repository<Project>, memberRepository: Repository<Member>, ideaRepository: Repository<Idea>, userRepository: Repository<User>, commentRepository: Repository<Comment>);
    createComment(userId: number, projectId: number, ideaId: number, comment: string, requester: any): Promise<any>;
    deleteComment(userId: number, projectId: number, ideaId: number, commentId: number, requester: any): Promise<any>;
    updateComment(userId: number, projectId: number, ideaId: number, commentId: string, comment: string, requester: any): Promise<any>;
    getComment(userId: number, projectId: number, ideaId: number, commentId: number, requester: any): Promise<any>;
}
