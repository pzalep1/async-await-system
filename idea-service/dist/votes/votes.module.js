"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const idea_entity_1 = require("../entities/idea.entity");
const member_entity_1 = require("../entities/member.entity");
const project_entity_1 = require("../entities/project.entity");
const user_entity_1 = require("../entities/user.entity");
const vote_entity_1 = require("../entities/vote.entity");
const jwt_strategy_1 = require("../jwt/jwt.strategy");
const votes_controller_1 = require("./votes.controller");
const votes_service_1 = require("./votes.service");
let VotesModule = class VotesModule {
};
VotesModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([project_entity_1.Project]),
            typeorm_1.TypeOrmModule.forFeature([member_entity_1.Member]),
            typeorm_1.TypeOrmModule.forFeature([idea_entity_1.Idea]),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            typeorm_1.TypeOrmModule.forFeature([vote_entity_1.Vote]),
        ],
        controllers: [votes_controller_1.VotesController],
        providers: [votes_service_1.VotesService, jwt_strategy_1.JwtStrategy]
    })
], VotesModule);
exports.VotesModule = VotesModule;
//# sourceMappingURL=votes.module.js.map