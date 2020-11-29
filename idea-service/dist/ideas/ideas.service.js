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
exports.IdeaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const administers_entity_1 = require("../entities/administers.entity");
const idea_entity_1 = require("../entities/idea.entity");
const member_entity_1 = require("../entities/member.entity");
const project_entity_1 = require("../entities/project.entity");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("../entities/comment.entity");
let IdeaService = class IdeaService {
    constructor(projectRepository, adminRepository, memberRepository, ideaRepository, userRepository, commentRepository) {
        this.projectRepository = projectRepository;
        this.adminRepository = adminRepository;
        this.memberRepository = memberRepository;
        this.ideaRepository = ideaRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }
    async createIdea(userId, projectId, idea) {
        const user = await this.userRepository.findOne({ userId });
        if (user) {
            if (!idea) {
                throw new common_1.HttpException('Idea must be defined', common_1.HttpStatus.BAD_REQUEST);
            }
            const project = await this.projectRepository.findOne({ projectId });
            if (project) {
                const timestamp = Date.now().toString();
                return await this.ideaRepository.insert({ userId, projectId, idea, timestamp });
            }
            else {
                throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
        else {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async updateIdea(userId, projectId, ideaId, idea) {
        const user = await this.userRepository.findOne({ userId });
        if (user) {
            const project = await this.projectRepository.findOne({ projectId });
            if (project) {
                const foundIdea = await this.ideaRepository.findOne({ ideaId });
                if (foundIdea) {
                    return await this.ideaRepository.update(ideaId, { idea, timestamp: Date.now().toString() });
                }
                else {
                    throw new common_1.HttpException('Idea not found', common_1.HttpStatus.NOT_FOUND);
                }
            }
            else {
                throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
        else {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getIdea(userId, projectId, ideaId) {
        const user = await this.userRepository.findOne({ userId });
        if (user) {
            const project = await this.projectRepository.findOne({ projectId });
            if (project) {
                const foundIdea = await this.ideaRepository.findOne({ ideaId });
                if (!foundIdea) {
                    throw new common_1.HttpException('Idea not found', common_1.HttpStatus.NOT_FOUND);
                }
                else {
                    return foundIdea;
                }
            }
            else {
                throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
        else {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async changeStateOfIdea(userId, projectId, ideaId, newState, requester) {
        const user = await this.userRepository.findOne({ userId });
        if (user) {
            const project = await this.projectRepository.findOne({ projectId });
            const userAuthorized = await this.adminRepository.findOne({ userId: requester.userId, projectId });
            if (project && userAuthorized) {
                const foundIdea = await this.ideaRepository.findOne({ ideaId });
                if (foundIdea) {
                    return await this.ideaRepository.update(ideaId, { state: newState, timestamp: Date.now().toString() });
                }
                else {
                    throw new common_1.HttpException('Idea not found', common_1.HttpStatus.NOT_FOUND);
                }
            }
            else {
                throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
        else {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async deleteIdea(userId, projectId, ideaId) {
        const user = await this.userRepository.findOne({ userId });
        if (user) {
            const project = await this.projectRepository.findOne({ projectId });
            if (project) {
                const foundIdea = await this.ideaRepository.findOne({ ideaId });
                if (foundIdea) {
                    return await this.ideaRepository.delete(ideaId);
                }
                else {
                    throw new common_1.HttpException('Idea not found', common_1.HttpStatus.NOT_FOUND);
                }
            }
            else {
                throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
        else {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async getCommentsForIdea(userId, projectId, ideaId) {
        const user = await this.userRepository.findOne({ userId });
        if (user) {
            const project = await this.projectRepository.findOne({ projectId });
            if (project) {
                const foundIdea = await this.ideaRepository.findOne({ ideaId });
                if (foundIdea) {
                    return await this.commentRepository.find({ ideaId });
                }
                else {
                    throw new common_1.HttpException('Idea not found', common_1.HttpStatus.NOT_FOUND);
                }
            }
            else {
                throw new common_1.HttpException('Project not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
        else {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
IdeaService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(project_entity_1.Project)),
    __param(1, typeorm_1.InjectRepository(administers_entity_1.Administers)),
    __param(2, typeorm_1.InjectRepository(member_entity_1.Member)),
    __param(3, typeorm_1.InjectRepository(idea_entity_1.Idea)),
    __param(4, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(5, typeorm_1.InjectRepository(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], IdeaService);
exports.IdeaService = IdeaService;
//# sourceMappingURL=ideas.service.js.map