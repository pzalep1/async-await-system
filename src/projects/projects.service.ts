import { Injectable } from '@nestjs/common';
import { SqlDriver } from '../drivers/sqlDriver.service';

@Injectable()
export class ProjectService {
    constructor(private readonly sqlDriver: SqlDriver) {

    }
  getAllProjectsForUser(userId: string): any {
    return this.sqlDriver.getAllProjectsForUser(userId);
  }
}