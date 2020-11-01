import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { IdeaModule } from './ideas/ideas.module';
import { ProjectModule } from './projects/projects.module';
import { CommentModule } from './comments/comments.module';
import { VotesModule } from './votes/votes.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    IdeaModule,
    ProjectModule,
    CommentModule,
    VotesModule,
    DriverModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
