import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administers } from 'src/entities/administers.entity';
import { Idea } from 'src/entities/idea.entity';
import { Member } from 'src/entities/member.entity';
import { Project } from 'src/entities/project.entity';
import { User } from 'src/entities/user.entity';
import { Vote } from 'src/entities/vote.entity';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([Member]),
    TypeOrmModule.forFeature([Idea]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Vote]),
    TypeOrmModule.forFeature([Administers]),
  ],
  controllers: [VotesController],
  providers: [VotesService, JwtStrategy]
})
export class VotesModule {}