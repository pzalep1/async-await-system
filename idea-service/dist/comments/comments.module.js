"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const administers_entity_1 = require("../entities/administers.entity");
const idea_entity_1 = require("../entities/idea.entity");
const member_entity_1 = require("../entities/member.entity");
const project_entity_1 = require("../entities/project.entity");
const user_entity_1 = require("../entities/user.entity");
const comment_entity_1 = require("../entities/comment.entity");
const comments_controller_1 = require("./comments.controller");
const comments_service_1 = require("./comments.service");
const jwt_strategy_1 = require("../jwt/jwt.strategy");
let CommentModule = class CommentModule {
};
CommentModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([project_entity_1.Project]),
            typeorm_1.TypeOrmModule.forFeature([administers_entity_1.Administers]),
            typeorm_1.TypeOrmModule.forFeature([member_entity_1.Member]),
            typeorm_1.TypeOrmModule.forFeature([idea_entity_1.Idea]),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            typeorm_1.TypeOrmModule.forFeature([comment_entity_1.Comment])
        ],
        controllers: [comments_controller_1.CommentController],
        providers: [comments_service_1.CommentService, jwt_strategy_1.JwtStrategy],
    })
], CommentModule);
exports.CommentModule = CommentModule;
//# sourceMappingURL=comments.module.js.map