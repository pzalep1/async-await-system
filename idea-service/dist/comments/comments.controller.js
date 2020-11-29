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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../jwt/jwt-auth.guard");
const comments_service_1 = require("./comments.service");
const core_1 = require("@nestjs/core");
let CommentController = class CommentController {
    constructor(commentService, request) {
        this.commentService = commentService;
        this.request = request;
    }
    createComment(routeParameterDTO, commentWriteDTO) {
        const requester = this.request.user;
        const userId = routeParameterDTO.userId;
        const projectId = routeParameterDTO.projectId;
        const ideaId = routeParameterDTO.ideaId;
        const comment = commentWriteDTO.comment;
        return this.commentService.createComment(userId, projectId, ideaId, comment, requester);
    }
    deleteComment(routeParameterDTO) {
        const requester = this.request.user;
        const commentId = routeParameterDTO.commentId;
        const userId = routeParameterDTO.userId;
        const projectId = routeParameterDTO.projectId;
        const ideaId = routeParameterDTO.ideaId;
        return this.commentService.deleteComment(userId, projectId, ideaId, commentId, requester);
    }
    updateComment(routeParameterDTO, commentWriteDTO) {
        const requester = this.request.user;
        const userId = routeParameterDTO.userId;
        const projectId = routeParameterDTO.projectId;
        const ideaId = routeParameterDTO.ideaId;
        const commentId = routeParameterDTO.commentId;
        const comment = commentWriteDTO.comment;
        return this.commentService.updateComment(userId, projectId, ideaId, commentId, comment, requester);
    }
    getComment(routeParameterDTO) {
        const requester = this.request.user;
        const userId = routeParameterDTO.userId;
        const projectId = routeParameterDTO.projectId;
        const ideaId = routeParameterDTO.ideaId;
        const comment = routeParameterDTO.commentId;
        return this.commentService.getComment(userId, projectId, ideaId, comment, requester);
    }
};
__decorate([
    common_1.Post('/users/:userId/projects/:projectId/ideas/:ideaId/comments'),
    common_1.HttpCode(201),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], CommentController.prototype, "createComment", null);
__decorate([
    common_1.Delete('/users/:userId/projects/:projectId/ideas/:ideaId/comments/:commentId'),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], CommentController.prototype, "deleteComment", null);
__decorate([
    common_1.Patch('/users/:userId/projects/:projectId/ideas/:ideaId/comments/:commentId'),
    common_1.HttpCode(201),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], CommentController.prototype, "updateComment", null);
__decorate([
    common_1.Get('/users/:userId/projects/:projectId/ideas/:ideaId/comments/:commentId'),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], CommentController.prototype, "getComment", null);
CommentController = __decorate([
    common_1.Controller({ scope: common_1.Scope.REQUEST }),
    __param(1, common_1.Inject(core_1.REQUEST)),
    __metadata("design:paramtypes", [comments_service_1.CommentService, Object])
], CommentController);
exports.CommentController = CommentController;
//# sourceMappingURL=comments.controller.js.map