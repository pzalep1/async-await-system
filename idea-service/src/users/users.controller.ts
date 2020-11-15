import { Body, Controller, Delete, HttpCode, Param, Patch, Post, Get, UseGuards } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { JwtAuthGuard } from "src/jwt/jwt-auth.guard";
import { UserService } from "./users.service";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

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
    return;
  }
  /*
  * Will delete a user
  */
 @Delete('/users/:userId')
 @HttpCode(200)
 @UseGuards(JwtAuthGuard)
 deleteUser(@Param() routeParameterDTO:any):any{
    const userId = routeParameterDTO.userId;
    return this.userService.deleteUser(userId);
 }
}