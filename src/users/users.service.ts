import { Injectable } from '@nestjs/common';
import { SqlDriver } from '../drivers/sqlDriver.service';

@Injectable()
export class UserService {
  constructor(private readonly sqlDriver: SqlDriver) {

  }
  createUser():any{
    return this.sqlDriver.createUser();
  }
  updateUser(userId:string):any{
    return this.sqlDriver.updateUser(userId);
  }
  deleteUser(userId:string):any{
    return this.sqlDriver.deleteUser(userId);
  }
}