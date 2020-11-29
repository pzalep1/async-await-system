import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Administers } from '../entities/administers.entity';
import { Member } from 'src/entities/member.entity';
import { Idea } from 'src/entities/idea.entity';
import { User } from 'src/entities/user.entity';
export declare class ProjectService {
    private projectRepository;
    private adminRepository;
    private memberRepository;
    private ideaRepository;
    private userRepository;
    constructor(projectRepository: Repository<Project>, adminRepository: Repository<Administers>, memberRepository: Repository<Member>, ideaRepository: Repository<Idea>, userRepository: Repository<User>);
    getAdminProjects(userId: number): Promise<any>;
    getUserProjects(userId: number): Promise<any>;
    getProject(projectId: string): Promise<any>;
    createProject(userId: number, name: string, description: string, color: string): Promise<any>;
    addUserToProject(userId: number, projectId: number): Promise<any>;
    addAdminToProject(userId: number, projectId: number): Promise<any>;
    updateProject(projectId: number, name: string, description: string, color: string): Promise<any>;
    deleteUsersFromProject(userId: number, projectId: number): Promise<any>;
    getAllIdeasForProject(projectId: number): Promise<any>;
    deleteProject(projectId: number): Promise<any>;
    getUsersForProject(projectId: number): Promise<any>;
    getAdminsForProject(projectId: number): Promise<any>;
}
