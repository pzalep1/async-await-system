import { Module } from '@nestjs/common';
import { ProjectController } from './projects.controller';
import { ProjectService } from './projects.service';
import { Project } from 'src/entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administers } from 'src/entities/administers.entity';
import { Member } from 'src/entities/member.entity';
import { Idea } from 'src/entities/idea.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([Administers]),
    TypeOrmModule.forFeature([Member]),
    TypeOrmModule.forFeature([Idea])
  ],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}