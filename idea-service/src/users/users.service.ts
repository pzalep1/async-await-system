import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { SqlDriver } from '../drivers/sqlDriver.service';
import { generateBearerToken } from '../jwt/generateBearerToken';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(private readonly sqlDriver: SqlDriver, @InjectRepository(User) private userRepository: Repository<User>) {

  }
  createUser(user: User): any{
    return this.userRepository.insert(user);
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