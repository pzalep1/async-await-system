import { Module } from 'idea-service/node_modules/@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { SqlDriver } from '../drivers/sqlDriver.service';
@Module({
  imports: [SqlDriver],
  controllers: [UserController],
  providers: [UserService, SqlDriver],
})
export class UserModule {}