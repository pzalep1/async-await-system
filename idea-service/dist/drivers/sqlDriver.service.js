"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlDriver = void 0;
const common_1 = require("@nestjs/common");
let SqlDriver = class SqlDriver {
    createUser() {
        throw new Error('Method not implemented');
    }
    updateUser(userId) {
        throw new Error('Method not implemented');
    }
    deleteUser(userId) {
        throw new Error('Method not implemented');
    }
    getUser() {
    }
    getProject(userId, projectId) {
        throw new Error('Method not implemented');
    }
    createProject(userId, name, description, color) {
        throw new Error('Method not implemented');
    }
    addUserToProject(userId, projectId) {
        throw new Error('Method not implemented');
    }
    updateProject(userId, projectId, name, description, color) {
        throw new Error('Method not implemented');
    }
    addAdminToProject(userId, projectId) {
        throw new Error('Method not implemented');
    }
    deleteUsersFromProject(userId, projectId) {
        throw new Error('Method not implemented');
    }
    getAllIdeasForProject(projectId) {
        throw new Error('Method not implemented');
    }
    deleteProject(userId, projectId) {
        throw new Error('Method not implemented');
    }
    getAllProjectsForAdmin(userId) {
        throw new Error('Method not implemented');
    }
    getAllProjectsForUser(userId) {
        throw new Error('Method not implemented');
    }
    createIdea(userId, projectId, idea, timestamp) {
        throw new Error('Method not implemented');
    }
    updateIdea(userId, projectId, idea, timestamp) {
        throw new Error('Method not implemented');
    }
    getIdea(userId, projectId, ideaId) {
        throw new Error('Method not implemented');
    }
    changeStateOfIdea(projectId, ideaId, newState) {
        throw new Error('Method not implemented');
    }
    deleteIdea(projectId, ideaId) {
        throw new Error('Method not implemented');
    }
    getCommentsForIdea(projectId, ideaId) {
        throw new Error('Method not implemented');
    }
    createComment(userId, projectId, ideaId, comment) {
        throw new Error('Method not implemented');
    }
    deleteComment(userId, projectId, ideaId) {
        throw new Error('Method not implemented');
    }
    updateComment(userId, projectId, ideaId, comment) {
        throw new Error('Method not implemented');
    }
    getComment(userId, projectId, ideaId, comment) {
        throw new Error('Method not implemented');
    }
    addVote(userId, vote) {
        throw new Error('Method not implemented');
    }
    deleteVote(userId, projectId, ideaId, voteId) {
        throw new Error('Method not implemented');
    }
    updateVote(userId, projectId, ideaId, voteId, vote) {
        throw new Error('Method not implemented');
    }
    getVotesForIdea(projectId, ideaId) {
        throw new Error('Method not implemented');
    }
};
SqlDriver = __decorate([
    common_1.Injectable()
], SqlDriver);
exports.SqlDriver = SqlDriver;
//# sourceMappingURL=sqlDriver.service.js.map