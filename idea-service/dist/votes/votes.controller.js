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
exports.VotesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../jwt/jwt-auth.guard");
const votes_service_1 = require("./votes.service");
const core_1 = require("@nestjs/core");
let VotesController = class VotesController {
    constructor(voteService, request) {
        this.voteService = voteService;
        this.request = request;
    }
    getVotes(routeParameterDTO) {
        const projectId = routeParameterDTO.projectId;
        const ideaId = routeParameterDTO.ideaId;
        const userId = routeParameterDTO.userId;
        const requester = this.request.user;
        return this.voteService.getVotesForIdea(userId, projectId, ideaId, requester);
    }
    addVote(routeParameterDTO, voteWriteDTO) {
        const userId = routeParameterDTO.userId;
        const projectId = routeParameterDTO.projectId;
        const ideaId = routeParameterDTO.ideaId;
        const requester = this.request.user;
        const vote = voteWriteDTO.vote;
        return this.voteService.addVote(userId, projectId, ideaId, vote, requester);
    }
    deleteVote(routeParameterDTO) {
        const userId = routeParameterDTO.userId;
        const projectId = routeParameterDTO.projectId;
        const ideaId = routeParameterDTO.ideaId;
        const voteId = routeParameterDTO.voteId;
        const requester = this.request.user;
        return this.voteService.deleteVote(userId, projectId, ideaId, voteId, requester);
    }
    updateVote(routeParameterDTO, voteWriteDTO) {
        try {
            const userId = routeParameterDTO.userId;
            const projectId = routeParameterDTO.projectId;
            const ideaId = routeParameterDTO.ideaId;
            const voteId = routeParameterDTO.voteId;
            const vote = voteWriteDTO.vote;
            const requester = this.request.user;
            return this.voteService.updateVote(userId, projectId, ideaId, voteId, vote, requester);
        }
        catch (e) {
            console.log(e);
        }
    }
};
__decorate([
    common_1.Get('/users/:userId/projects/:projectId/ideas/:ideaId/votes'),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], VotesController.prototype, "getVotes", null);
__decorate([
    common_1.Post('/users/:userId/projects/:projectId/ideas/:ideaId/votes'),
    common_1.HttpCode(201),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], VotesController.prototype, "addVote", null);
__decorate([
    common_1.Delete('/users/:userId/projects/:projectId/ideas/:ideaId/votes/:voteId'),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], VotesController.prototype, "deleteVote", null);
__decorate([
    common_1.Patch('/users/:userId/projects/:projectId/ideas/:ideaId/votes/:voteId'),
    common_1.HttpCode(201),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], VotesController.prototype, "updateVote", null);
VotesController = __decorate([
    common_1.Controller({ scope: common_1.Scope.REQUEST }),
    __param(1, common_1.Inject(core_1.REQUEST)),
    __metadata("design:paramtypes", [votes_service_1.VotesService, Object])
], VotesController);
exports.VotesController = VotesController;
//# sourceMappingURL=votes.controller.js.map