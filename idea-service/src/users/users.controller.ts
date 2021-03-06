import { Body, Controller, Delete, HttpCode, Param, Patch, Post, Get, UseGuards, Inject, Scope } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { JwtAuthGuard } from "src/jwt/jwt-auth.guard";
import { UserService } from "./users.service";
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AuthGuard } from "@nestjs/passport";
@Controller({scope: Scope.REQUEST})
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(REQUEST) private readonly request: Request,
    ) {}

  /*
  API CONTRACT: USER AUTH: 
  -POST: /users/tokens ==> NOT IMPLEMENTED
  -GET: /users/tokens ==> NOT IMPLEMENTED
  */

  /*
  * Will add a user
  */
  @Post('/users')
  @HttpCode(201)
  addUser(@Body() userWriteDTO: any): any {
    const user = userWriteDTO.user as User;
    return this.userService.createUser(user);
  }

  @Patch('/users/:userId')
  @UseGuards(JwtAuthGuard)
  updateUser(@Body() userWriteDTO: any, @Param() routeParameterDTO:any): any {
    const requester = this.request.user;
    const userId = routeParameterDTO.userId;
    const updates = userWriteDTO.user as User;
    return this.userService.updateUser(userId, updates, requester);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  @HttpCode(200)
  getUsers(): any {
    return this.userService.getUsers();
  }

  /**
   * Will log in a user
   */
  @Patch('/users')
  @HttpCode(200)
  login(@Body() userWriteDTO: any): any {
    const user = userWriteDTO.user;
    return this.userService.login(user);
  }

  /**
   * Checks if a users token is still valid
   */
  @Get('/users/tokens')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  checkToken() {
    const requester = this.request.user;
    return requester;
  }
  /*
  * Will delete a user
  */
 @Delete('/users/:userId')
 @HttpCode(200)
 @UseGuards(JwtAuthGuard)
 deleteUser(@Param() routeParameterDTO:any):any{
    const userId = routeParameterDTO.userId;
    const requester = this.request.user;
    return this.userService.deleteUser(userId, requester);
 }
}