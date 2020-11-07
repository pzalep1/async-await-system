import { Controller, Delete, HttpCode, Param, Patch, Post } from "@nestjs/common";
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
  addUser():any{
    try{
      return this.userService.createUser();
    }
    catch(e){
      console.log(e);
    }
  }

  @Patch('/users')
  @HttpCode(200)
  login(): any {
    try {
      return this.userService.login('hello');
    } catch(e) {
      console.log(e);
    }
  }
  /*
  * Will delete a user
  */
 @Delete('/users/:userId')
 @HttpCode(200)
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
 updateUser(@Param() routeParameterDTO:any):any{
   try{
     const userId = routeParameterDTO.userId;
     return this.userService.updateUser(userId);
   }
   catch(e){
     console.log(e);
   }
 }
}