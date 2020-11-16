import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administers } from 'src/entities/administers.entity';
import { Idea } from 'src/entities/idea.entity';
import { Member } from 'src/entities/member.entity';
import { Project } from 'src/entities/project.entity';
import { User } from 'src/entities/user.entity';
import { IdeaController } from './ideas.controller';
import { IdeaService } from './ideas.service';
import { Comment } from '../entities/comment.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([Administers]),
    TypeOrmModule.forFeature([Member]),
    TypeOrmModule.forFeature([Idea]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Comment])
  ],
  controllers: [IdeaController],
  providers: [IdeaService],
})
export class IdeaModule {}