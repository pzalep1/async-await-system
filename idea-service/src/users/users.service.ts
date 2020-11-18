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
      return this.userRepository.insert(user);
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
}