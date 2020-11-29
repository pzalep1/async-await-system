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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const config_1 = require("@nestjs/config");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const ideas_module_1 = require("./ideas/ideas.module");
const projects_module_1 = require("./projects/projects.module");
const comments_module_1 = require("./comments/comments.module");
const votes_module_1 = require("./votes/votes.module");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const project_entity_1 = require("./entities/project.entity");
const comment_entity_1 = require("./entities/comment.entity");
const idea_entity_1 = require("./entities/idea.entity");
const administers_entity_1 = require("./entities/administers.entity");
const member_entity_1 = require("./entities/member.entity");
const vote_entity_1 = require("./entities/vote.entity");
let AppModule = class AppModule {
    constructor(connection) {
        this.connection = connection;
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            users_module_1.UserModule,
            ideas_module_1.IdeaModule,
            projects_module_1.ProjectModule,
            comments_module_1.CommentModule,
            votes_module_1.VotesModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'example',
                database: 'async-await',
                entities: [user_entity_1.User, project_entity_1.Project, comment_entity_1.Comment, idea_entity_1.Idea, administers_entity_1.Administers, member_entity_1.Member, vote_entity_1.Vote],
                synchronize: true,
                retryAttempts: 3
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map