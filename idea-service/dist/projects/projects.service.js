"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("../entities/project.entity");
const administers_entity_1 = require("../entities/administers.entity");
const member_entity_1 = require("../entities/member.entity");
const idea_entity_1 = require("../entities/idea.entity");
const user_entity_1 = require("../entities/user.entity");
let ProjectService = class ProjectService {
    constructor(projectRepository, adminRepository, memberRepository, ideaRepository, userRepository) {
        this.projectRepository = projectRepository;
        this.adminRepository = adminRepository;
        this.memberRepository = memberRepository;
        this.ideaRepository = ideaRepository;
        this.userRepository = userRepository;
    }
    async getAdminProjects(userId) {
        const user = await this.userRepository.findOne({ userId });
        if (user) {
            const projectIds = await this.adminRepository.find({ userId });
            const projects = [];
            for (let i = 0; i < projectIds.length; i++) {
                const id = projectIds[i].projectId;
                const project = await this.projectRepository.findOne({ projectId: id });
                projects.push(project);
            }
            return projects;
        }
        else {
            throw new common_1.HttpException('UserId not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getUserProjects(userId) {
        const user = await this.userRepository.findOne({ userId });
        if (user) {
            const projectIds = await this.memberRepository.find({ userId });
            const projects = [];
            for (let i = 0; i < projectIds.length; i++) {
                const id = projectIds[i].projectId;
                const project = await this.projectRepository.findOne({ projectId: id });
                projects.push(project);
            }
            return projects;
        }
        else {
            throw new common_1.HttpException('UserId not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getProject(projectId) {
        const project = await this.projectRepository.findOne(projectId);
        if (project) {
            return project;
        }
        else {
            throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async createProject(userId, name, description, color) {
        if (name && description && color) {
            const project = await this.projectRepository.insert({ name, description, color });
            const projectId = project.identifiers[0].projectId;
            this.adminRepository.insert({ userId, projectId });
            return projectId;
        }
        else {
            throw new common_1.HttpException('Name, description, and color must be defined', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addUserToProject(userId, projectId) {
        const user = await this.userRepository.findOne({ userId });
        if (user) {
            return this.memberRepository.insert({ userId, projectId });
        }
        else {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async addAdminToProject(userId, projectId) {
        const user = await this.userRepository.findOne({ userId });
        if (user) {
            this.adminRepository.insert({ userId, projectId });
        }
        else {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async updateProject(projectId, name, description, color) {
        const project = await this.projectRepository.findOne(projectId);
        if (project) {
            return this.projectRepository.update(projectId, { name, description, color });
        }
        else {
            throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async deleteUsersFromProject(userId, projectId) {
        const user = await this.userRepository.findOne({ userId });
        if (user) {
            this.memberRepository.delete({ userId, projectId });
        }
        else {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAllIdeasForProject(projectId) {
        const project = await this.projectRepository.findOne(projectId);
        if (project) {
            return await this.ideaRepository.createQueryBuilder('Idea').where('projectId = :projectId', { projectId: projectId }).getMany();
        }
        else {
            throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async deleteProject(projectId) {
        const project = await this.projectRepository.findOne(projectId);
        if (project) {
            this.projectRepository.delete(projectId);
            this.memberRepository.delete({ projectId: projectId });
            this.adminRepository.delete({ projectId: projectId });
        }
        else {
            throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getUsersForProject(projectId) {
        const project = await this.projectRepository.findOne(projectId);
        if (project) {
            return await this.memberRepository.find({ projectId: projectId });
        }
        else {
            throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getAdminsForProject(projectId) {
        const project = await this.projectRepository.findOne(projectId);
        if (project) {
            const users = await this.adminRepository.find({ projectId: projectId });
            return users;
        }
        else {
            throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
ProjectService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(project_entity_1.Project)),
    __param(1, typeorm_1.InjectRepository(administers_entity_1.Administers)),
    __param(2, typeorm_1.InjectRepository(member_entity_1.Member)),
    __param(3, typeorm_1.InjectRepository(idea_entity_1.Idea)),
    __param(4, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=projects.service.js.map