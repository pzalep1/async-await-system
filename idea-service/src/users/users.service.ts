import { Injectable } from '@nestjs/common';
import { SqlDriver } from '../drivers/sqlDriver.service';
import { generateBearerToken } from '../jwt/generateBearerToken';
@Injectable()
export class UserService {
  constructor(private readonly sqlDriver: SqlDriver) {

  }
  createUser(): any{
    return this.sqlDriver.createUser();
  }
  updateUser(userId: string): any{
    return this.sqlDriver.updateUser(userId);
  }
  deleteUser(userId: string): any{
    return this.sqlDriver.deleteUser(userId);
  }
  login(user: any): any{
    const token = generateBearerToken(user)
    return token;
  }
}