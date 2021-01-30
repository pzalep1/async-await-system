import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { generateBearerToken } from '../jwt/generateBearerToken';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {

  }
  async createUser(user: User): Promise<any> {
    // SQL Query executed: FROM USER SELECT * WHERE email = user.email;
    const found = await this.userRepository.createQueryBuilder('User').where('email = :email', { email: user.email }).getOne();
    if (found) {
      throw new HttpException('Email already in use', HttpStatus.CONFLICT);
    } else {
      this.validateUser(user);
      await this.userRepository.insert(user);
      return;
    }
  }

  async updateUser(userId: number, updates: any, requester: any): Promise<any> {
    const user = await this.userRepository.findOne(requester.userId);
    const found = await this.userRepository.findOne(userId);
    if (found && found.userId === user.userId) {
      return this.userRepository.update(userId, updates);
    } else {
      if (!found) {
        throw new HttpException('User not found. Unable to update', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException('Not authorized to update this user', HttpStatus.FORBIDDEN);
      }
    }
  }
  async deleteUser(userId: string, requester: any): Promise<any> {
    const user = await this.userRepository.findOne(requester.userId);
    const found = await this.userRepository.findOne(userId);
    if (found && found.userId === user.userId) {
      return this.userRepository.delete(userId);
    } else {
      if (!found) {
        throw new HttpException('User not found. Unable to delete', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException('Not authorized to delete this user', HttpStatus.FORBIDDEN);
      }
    }
  }

  async getUsers(): Promise<any> {
    const users = await this.userRepository.find();
    users.forEach(user => {
      delete user.password;
    });
    return users;
  }
  async login(user: any): Promise<any> {
    // SQL Query executed: FROM USER SELECT * WHERE email = user.email;
    const found = await this.userRepository.createQueryBuilder('User').where('email = :email', { email: user.email }).getOne();
    if (found) {
      if(user.password === found.password) {
        const token = generateBearerToken(found);
        delete found.password;
        return { token, found };
      } else {
        throw new HttpException('Incorrect Password', HttpStatus.UNAUTHORIZED);
      }
    } else {
      throw new HttpException('There is no user under that email', HttpStatus.NOT_FOUND);
    }
  }

  /**HELPER FUNCTIONS*/

  validateUser(user: User) {
    if (user.fName.trim().length === 0) {
      throw new HttpException('Name cannot be empty string', HttpStatus.BAD_REQUEST);
    }
    if (user.lName.trim().length === 0) {
      throw new HttpException('Name cannot be empty string', HttpStatus.BAD_REQUEST);
    } 
    if (user.email.trim().length === 0) {
      throw new HttpException('Email cannot be an empty string', HttpStatus.BAD_REQUEST);
    } 
    if (user.password.length === 0) {
      throw new HttpException('Password cannot be empty string', HttpStatus.BAD_REQUEST);
    }
  }
}