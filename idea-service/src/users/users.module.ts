import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { SqlDriver } from '../drivers/sqlDriver.service';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
@Module({
  imports: [SqlDriver, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, SqlDriver, JwtStrategy],
})
export class UserModule {}