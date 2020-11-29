/// <reference types="passport" />
import { UserService } from "./users.service";
import { Request } from 'express';
export declare class UserController {
    private readonly userService;
    private readonly request;
    constructor(userService: UserService, request: Request);
    addUser(userWriteDTO: any): any;
    login(userWriteDTO: any): any;
    checkToken(): Express.User;
    deleteUser(routeParameterDTO: any): any;
}
