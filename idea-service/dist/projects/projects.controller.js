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
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../jwt/jwt-auth.guard");
const projects_service_1 = require("./projects.service");
const core_1 = require("@nestjs/core");
let ProjectController = class ProjectController {
    constructor(projectService, request) {
        this.projectService = projectService;
        this.request = request;
    }
    async getProjects(routeParameterDTO) {
        const userId = routeParameterDTO.userId;
        const userProjects = await this.projectService.getUserProjects(userId);
        const adminProjects = await this.projectService.getAdminProjects(userId);
        return { member: userProjects, administers: adminProjects };
    }
    getProject(routeParameterDTO) {
        const projectId = routeParameterDTO.projectId;
        return this.projectService.getProject(projectId);
    }
    createProject(routeParameterDTO, projectWriteDTO) {
        const userId = routeParameterDTO.userId;
        const name = projectWriteDTO.project.name;
        const description = projectWriteDTO.project.description;
        const color = projectWriteDTO.project.color;
        return this.projectService.createProject(userId, name, description, color);
    }
    addUserToProject(routeParameterDTO, projectWriteDTO) {
        const userId = projectWriteDTO.userId;
        const projectId = routeParameterDTO.projectId;
        return this.projectService.addUserToProject(userId, projectId);
    }
    addAdminToProject(routeParameterDTO, projectWriteDTO) {
        const userId = projectWriteDTO.userId;
        const projectId = routeParameterDTO.projectId;
        return this.projectService.addAdminToProject(userId, projectId);
    }
    updateProject(routeParameterDTO, projectWriteDTO) {
        const projectId = routeParameterDTO.projectId;
        const name = projectWriteDTO.name;
        const description = projectWriteDTO.description;
        const color = projectWriteDTO.color;
        return this.projectService.updateProject(projectId, name, description, color);
    }
    deleteUserFromProject(routeParameterDTO) {
        const userId = routeParameterDTO.userId;
        const projectId = routeParameterDTO.projectId;
        return this.projectService.deleteUsersFromProject(userId, projectId);
    }
    getAllIdeasForProject(routeParameterDTO) {
        const projectId = routeParameterDTO.projectId;
        return this.projectService.getAllIdeasForProject(projectId);
    }
    deleteProject(routeParameterDTO) {
        const projectId = routeParameterDTO.projectId;
        return this.projectService.deleteProject(projectId);
    }
    getUsersForProject(routeParameterDTO) {
        const projectId = routeParameterDTO.projectId;
        return this.projectService.getUsersForProject(projectId);
    }
    getAdminsForProject(routeParameterDTO) {
        const projectId = routeParameterDTO.projectId;
        return this.projectService.getAdminsForProject(projectId);
    }
};
__decorate([
    common_1.Get('/users/:userId/projects'),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjects", null);
__decorate([
    common_1.Get('/users/:userId/projects/:projectId'),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ProjectController.prototype, "getProject", null);
__decorate([
    common_1.Post('/users/:userId/projects'),
    common_1.HttpCode(201),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], ProjectController.prototype, "createProject", null);
__decorate([
    common_1.Post('/users/:userId/projects/:projectId/users'),
    common_1.HttpCode(201),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], ProjectController.prototype, "addUserToProject", null);
__decorate([
    common_1.Post('/users/:userId/projects/:projectId/admin/users'),
    common_1.HttpCode(201),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], ProjectController.prototype, "addAdminToProject", null);
__decorate([
    common_1.Patch('/users/:userId/projects/:projectId'),
    common_1.HttpCode(200),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], ProjectController.prototype, "updateProject", null);
__decorate([
    common_1.Delete('/users/:userId/projects/:projectId/users/:userId'),
    common_1.HttpCode(200),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ProjectController.prototype, "deleteUserFromProject", null);
__decorate([
    common_1.Get('/users/:userId/projects/:projectId/ideas'),
    common_1.HttpCode(200),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ProjectController.prototype, "getAllIdeasForProject", null);
__decorate([
    common_1.Delete('/users/:userId/projects/:projectId'),
    common_1.HttpCode(200),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ProjectController.prototype, "deleteProject", null);
__decorate([
    common_1.Get('/users/:userId/projects/:projectId/users'),
    common_1.HttpCode(200),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ProjectController.prototype, "getUsersForProject", null);
__decorate([
    common_1.Get('/users/:userId/projects/:projectId/users/admins'),
    common_1.HttpCode(200),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ProjectController.prototype, "getAdminsForProject", null);
ProjectController = __decorate([
    common_1.Controller({ scope: common_1.Scope.REQUEST }),
    __param(1, common_1.Inject(core_1.REQUEST)),
    __metadata("design:paramtypes", [projects_service_1.ProjectService, Object])
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=projects.controller.js.map