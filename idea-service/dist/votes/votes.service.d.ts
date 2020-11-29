import { Idea } from 'src/entities/idea.entity';
import { Member } from 'src/entities/member.entity';
import { Project } from 'src/entities/project.entity';
import { User } from 'src/entities/user.entity';
import { Vote } from 'src/entities/vote.entity';
import { Repository } from 'typeorm';
export declare class VotesService {
    private projectRepository;
    private memberRepository;
    private ideaRepository;
    private userRepository;
    private voteRepository;
    constructor(projectRepository: Repository<Project>, memberRepository: Repository<Member>, ideaRepository: Repository<Idea>, userRepository: Repository<User>, voteRepository: Repository<Vote>);
    getVotesForIdea(userId: number, projectId: number, ideaId: number, requester: any): Promise<any>;
    addVote(userId: number, projectId: number, ideaId: number, vote: boolean, requester: any): Promise<any>;
    deleteVote(userId: number, projectId: number, ideaId: number, voteId: number, requester: any): Promise<any>;
    updateVote(userId: number, projectId: number, ideaId: number, voteId: number, vote: boolean, requester: any): Promise<any>;
}
