import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { SqlDriver } from '../drivers/sqlDriver.service';
import { JwtStrategy } from '../jwt/jwt.strategy';
@Module({
  imports: [SqlDriver],
  controllers: [UserController],
  providers: [UserService, SqlDriver, JwtStrategy],
})
export class UserModule {}