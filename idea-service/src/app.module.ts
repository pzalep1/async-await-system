import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { IdeaModule } from './ideas/ideas.module';
import { ProjectModule } from './projects/projects.module';
import { CommentModule } from './comments/comments.module';
import { VotesModule } from './votes/votes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './entities/user.entity';
import { Project } from './entities/project.entity';
import { Comment } from './entities/comment.entity';
import { Idea } from './entities/idea.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    IdeaModule,
    ProjectModule,
    CommentModule,
    VotesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'async-await',
      entities: [User, Project, Comment, Idea],
      synchronize: true,
      retryAttempts: 3
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
