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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const generateBearerToken_1 = require("../jwt/generateBearerToken");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(user) {
        const found = await this.userRepository.createQueryBuilder('User').where('email = :email', { email: user.email }).getOne();
        if (found) {
            throw new common_1.HttpException('Email already in use', common_1.HttpStatus.CONFLICT);
        }
        else {
            await this.userRepository.insert(user);
            return;
        }
    }
    async deleteUser(userId, requester) {
        const user = await this.userRepository.findOne(requester.userId);
        const found = await this.userRepository.findOne(userId);
        if (found && found.userId === user.userId) {
            return this.userRepository.delete(userId);
        }
        else {
            if (!found) {
                throw new common_1.HttpException('User not found. Unable to delete', common_1.HttpStatus.NOT_FOUND);
            }
            else {
                throw new common_1.HttpException('Not authorized to delete this user', common_1.HttpStatus.FORBIDDEN);
            }
        }
    }
    async login(user) {
        const found = await this.userRepository.createQueryBuilder('User').where('email = :email', { email: user.email }).getOne();
        if (found) {
            if (user.password === found.password) {
                const token = generateBearerToken_1.generateBearerToken(found);
                delete found.password;
                return { token, found };
            }
            else {
                throw new common_1.HttpException('Incorrect Password', common_1.HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            throw new common_1.HttpException('There is no user under that email', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map