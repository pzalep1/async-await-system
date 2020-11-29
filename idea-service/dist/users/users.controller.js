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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
const jwt_auth_guard_1 = require("../jwt/jwt-auth.guard");
const users_service_1 = require("./users.service");
const core_1 = require("@nestjs/core");
let UserController = class UserController {
    constructor(userService, request) {
        this.userService = userService;
        this.request = request;
    }
    addUser(userWriteDTO) {
        const user = userWriteDTO.user;
        return this.userService.createUser(user);
    }
    login(userWriteDTO) {
        const user = userWriteDTO.user;
        return this.userService.login(user);
    }
    checkToken() {
        console.log('reqs');
        const requester = this.request.user;
        return requester;
    }
    deleteUser(routeParameterDTO) {
        const userId = routeParameterDTO.userId;
        const requester = this.request.user;
        return this.userService.deleteUser(userId, requester);
    }
};
__decorate([
    common_1.Post('/users'),
    common_1.HttpCode(201),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "addUser", null);
__decorate([
    common_1.Patch('/users'),
    common_1.HttpCode(200),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "login", null);
__decorate([
    common_1.Get('/users/tokens'),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "checkToken", null);
__decorate([
    common_1.Delete('/users/:userId'),
    common_1.HttpCode(200),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    common_1.Controller({ scope: common_1.Scope.REQUEST }),
    __param(1, common_1.Inject(core_1.REQUEST)),
    __metadata("design:paramtypes", [users_service_1.UserService, Object])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=users.controller.js.map