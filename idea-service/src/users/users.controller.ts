import { Body, Controller, Delete, HttpCode, Param, Patch, Post, UseGuards } from "@nestjs/common";
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
  addUser(@Body() userWriteDTO: any):any{
    try{
      const user = userWriteDTO.user as User;
      console.log(userWriteDTO);
      return this.userService.createUser(user);
    }
    catch(e){
      console.log(e);
    }
  }

  /**
   * Will log in a user
   */
  @Patch('/users')
  @HttpCode(200)
  login(): any {
    try {
      console.log('blah blah blah')
      return this.userService.login({userId: 'hello', fName: 'no', lName: 'yes', email:'nope@nope.com'});
    } catch(e) {
      console.log(e);
    }
  }
  /*
  * Will delete a user
  */
 @Delete('/users/:userId')
 @HttpCode(200)
 @UseGuards(JwtAuthGuard)
 deleteUser(@Param() routeParameterDTO:any):any{
   try{
     const userId = routeParameterDTO.userId;
     return this.userService.deleteUser(userId);
   }
   catch(e){
     console.log(e);
   }
 }
 /*
 * Will update a user
 */
 @Patch('/users/:userId')
 @HttpCode(201)
 @UseGuards(JwtAuthGuard)
 updateUser(@Param() routeParameterDTO:any, @Body() userWriteDTO: any):any{
   try{
     const userId = routeParameterDTO.userId;
     return this.userService.updateUser(userId);
   }
   catch(e){
     console.log(e);
   }
 }
}