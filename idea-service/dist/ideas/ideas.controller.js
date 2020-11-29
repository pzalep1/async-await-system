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
exports.IdeaController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_auth_guard_1 = require("../jwt/jwt-auth.guard");
const ideas_service_1 = require("./ideas.service");
let IdeaController = class IdeaController {
    constructor(ideaService, request) {
        this.ideaService = ideaService;
        this.request = request;
    }
    createIdea(routeParameterDTO, ideaWriteDTO) {
        const userId = routeParameterDTO.userId;
        const projectId = routeParameterDTO.projectId;
        const idea = ideaWriteDTO.idea;
        return this.ideaService.createIdea(userId, projectId, idea);
    }
    updateIdea(routeParameterDTO, ideaWriteDTO) {
        const userId = routeParameterDTO.userId;
        const projectId = routeParameterDTO.projectId;
        const ideaId = routeParameterDTO.ideaId;
        const idea = ideaWriteDTO.idea;
        return this.ideaService.updateIdea(userId, projectId, ideaId, idea);
    }
    getIdea(routeParameterDTO) {
        const userId = routeParameterDTO.userId;
        const projectId = routeParameterDTO.projectId;
        const ideaId = routeParameterDTO.ideaId;
        return this.ideaService.getIdea(userId, projectId, ideaId);
    }
    changeState(routeParameterDTO, ideaWriteDTO) {
        const requester = this.request.user;
        const userId = routeParameterDTO.userId;
        const projectId = routeParameterDTO.projectId;
        const ideaId = routeParameterDTO.ideaId;
        const newState = ideaWriteDTO.newState;
        return this.ideaService.changeStateOfIdea(userId, projectId, ideaId, newState, requester);
    }
    deleteIdea(routeParameterDTO) {
        const userId = routeParameterDTO.userId;
        const projectId = routeParameterDTO.projectId;
        const ideaId = routeParameterDTO.ideaId;
        return this.ideaService.deleteIdea(userId, projectId, ideaId);
    }
    getComments(routeParameterDTO) {
        const userId = routeParameterDTO.userId;
        const projectId = routeParameterDTO.projectId;
        const ideaId = routeParameterDTO.ideaId;
        return this.ideaService.getCommentsForIdea(userId, projectId, ideaId);
    }
};
__decorate([
    common_1.Post('/users/:userId/projects/:projectId/ideas'),
    common_1.HttpCode(201),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], IdeaController.prototype, "createIdea", null);
__decorate([
    common_1.Patch('/users/:userId/projects/:projectId/ideas/:ideaId'),
    common_1.HttpCode(201),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], IdeaController.prototype, "updateIdea", null);
__decorate([
    common_1.Get('/users/:userId/projects/:projectId/ideas/:ideaId'),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], IdeaController.prototype, "getIdea", null);
__decorate([
    common_1.Post('/users/:userId/projects/:projectId/ideas/:ideaId/status'),
    common_1.HttpCode(201),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], IdeaController.prototype, "changeState", null);
__decorate([
    common_1.Delete('/users/:userId/projects/:projectId/ideas/:ideaId'),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], IdeaController.prototype, "deleteIdea", null);
__decorate([
    common_1.Get('/users/:userId/projects/:projectId/ideas/:ideaId/comments'),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], IdeaController.prototype, "getComments", null);
IdeaController = __decorate([
    common_1.Controller({ scope: common_1.Scope.REQUEST }),
    __param(1, common_1.Inject(core_1.REQUEST)),
    __metadata("design:paramtypes", [ideas_service_1.IdeaService, Object])
], IdeaController);
exports.IdeaController = IdeaController;
//# sourceMappingURL=ideas.controller.js.map