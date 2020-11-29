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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const idea_entity_1 = require("../entities/idea.entity");
const member_entity_1 = require("../entities/member.entity");
const project_entity_1 = require("../entities/project.entity");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("../entities/comment.entity");
let CommentService = class CommentService {
    constructor(projectRepository, memberRepository, ideaRepository, userRepository, commentRepository) {
        this.projectRepository = projectRepository;
        this.memberRepository = memberRepository;
        this.ideaRepository = ideaRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }
    async createComment(userId, projectId, ideaId, comment, requester) {
        const user = await this.userRepository.findOne({ userId });
        if (user) {
            const project = await this.projectRepository.findOne({ projectId });
            const userAuthorized = await this.memberRepository.findOne({ userId: requester.userId, projectId });
            if (project && userAuthorized) {
                const foundIdea = await this.ideaRepository.findOne({ ideaId });
                if (foundIdea) {
                    return this.commentRepository.insert({ userId, ideaId, comment });
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
    async deleteComment(userId, projectId, ideaId, commentId, requester) {
        const user = await this.userRepository.findOne({ userId });
        if (user) {
            const project = await this.projectRepository.findOne({ projectId });
            const userAuthorized = await this.memberRepository.findOne({ userId: requester.userId, projectId });
            if (project && userAuthorized) {
                const foundIdea = await this.ideaRepository.findOne({ ideaId });
                if (foundIdea) {
                    return this.commentRepository.delete({ commentId });
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
    async updateComment(userId, projectId, ideaId, commentId, comment, requester) {
        const user = await this.userRepository.findOne({ userId });
        if (user) {
            const project = await this.projectRepository.findOne({ projectId });
            const userAuthorized = await this.memberRepository.findOne({ userId: requester.userId, projectId });
            if (project && userAuthorized) {
                const foundIdea = await this.ideaRepository.findOne({ ideaId });
                if (foundIdea) {
                    return this.commentRepository.update(commentId, { comment });
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
    async getComment(userId, projectId, ideaId, commentId, requester) {
        const user = await this.userRepository.findOne({ userId });
        if (user) {
            const project = await this.projectRepository.findOne({ projectId });
            const userAuthorized = await this.memberRepository.findOne({ userId: requester.userId, projectId });
            if (project && userAuthorized) {
                const foundIdea = await this.ideaRepository.findOne({ ideaId });
                if (foundIdea) {
                    return this.commentRepository.find({ commentId });
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
CommentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(project_entity_1.Project)),
    __param(1, typeorm_1.InjectRepository(member_entity_1.Member)),
    __param(2, typeorm_1.InjectRepository(idea_entity_1.Idea)),
    __param(3, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(4, typeorm_1.InjectRepository(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comments.service.js.map