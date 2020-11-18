import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idea } from 'src/entities/idea.entity';
import { Member } from 'src/entities/member.entity';
import { Project } from 'src/entities/project.entity';
import { User } from 'src/entities/user.entity';
import { Vote } from 'src/entities/vote.entity';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([Member]),
    TypeOrmModule.forFeature([Idea]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Vote]),
  ],
  controllers: [VotesController],
  providers: [VotesService]
})
export class VotesModule {}