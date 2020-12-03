import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../core/project.service';
import { IdeaService } from '../../core/idea.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommentService } from '../../core/comment.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AuthService } from 'src/app/core/auth.service';
import { VoteService } from 'src/app/core/vote.service';
export interface IdeaDialogData {
  idea: string;
}
export interface CommentDialogData {
  comment: string;
}

export interface UserDialogData {
  users: any[];
  userId: any;
}
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  projectId: any;
  userId: any;
  project: any;
  newIdea: any;
  ideas = {};
  newComment: any;
  users: any;
  admins: any;
  projectUsers: any;
  commentString: string = 'Comments';
  adminUsers: string;

  isAdmin: boolean;
  notAdminUsers: any[] = [];
  notProjectUsers: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    public dialog: MatDialog,
    private ideaService: IdeaService,
    private commentService: CommentService,
    private auth: AuthService,
    private vote: VoteService
  ) { }

  async ngOnInit() {
    // Grab route parameters
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.projectId = this.route.snapshot.paramMap.get('projectId');
   // Get the project so we have the name and description
    this.project = await this.projectService.getProject(this.userId, this.projectId);
    // Get the ideas for the project
    this.getIdeas();
    // Get all users
    this.users = await this.auth.getUsers();
    this.getUsersForProject();
  }

  async getUsersForProject() {
    this.admins = await this.projectService.getAdminsForProject(this.userId, this.projectId);
    this.projectUsers = await this.projectService.getUsersForProject(this.userId, this.projectId);
    // Sort out these into arrays
    const userInProj = this.projectUsers.map(x => x.userId);
    const admins = this.admins.map(x => x.userId.toString());

    this.isAdmin = admins.includes(this.userId);

    this.notAdminUsers = [];
    this.notProjectUsers = [];
    this.users.forEach(user => {
      if (user.userId !== this.userId) {
        if (!admins.includes(user.userId)) {
          this.notAdminUsers.push(user);
        } else if (!userInProj.includes(user.userId)) {
          this.notProjectUsers.push(user);
        }
      }
    });
  }

  createIdea() {
    this.ideaService.createIdea(this.userId, this.projectId, this.newIdea).then(async () => {
      this.getIdeas();
    });
  }
  deleteIdea(ideaId: any) {
    this.ideaService.deleteIdea(this.userId, this.projectId, ideaId).then(async () => {
      this.getIdeas();
    });
  }
  createComment(ideaId: any) {
    this.commentService.createComment(this.userId, this.projectId, ideaId, this.newComment).then(() => {
      this.getIdeas();
    });
  }
  addUser(newUserId: any) {
    this.projectService.addUserToProject(this.userId, this.projectId, newUserId).then(() => {
      this.getUsersForProject();
    });
  }
  addAdmin(newAdminId: any) {
    this.projectService.addAdminToProject(this.userId, this.projectId, newAdminId).then(() => {
      this.getUsersForProject();
    });
  }

  getIdeas() {
    this.ideaService.getIdeasForAProject(this.userId, this.projectId).then((ideas: any) => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < ideas.review.length; i++) {
        const ideaId = ideas.review[i].ideaId;
        this.commentService.getCommentsForIdea(this.userId, this.projectId, ideaId).then(async (comments: any) => {
          // tslint:disable-next-line: prefer-for-of
          ideas.review[i].comments = comments;
          ideas.review[i].votes = await this.vote.getVotesForIdea(this.userId, this.projectId, ideaId);

          ideas.review[i].votes = this.sortVotes(ideas.review[i].votes);
        });
      }
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < ideas.accepted.length; i++) {
        const ideaId = ideas.accepted[i].ideaId;
        this.commentService.getCommentsForIdea(this.userId, this.projectId, ideaId).then(async (comments: any) => {
          // tslint:disable-next-line: prefer-for-of
          ideas.accepted[i].comments = comments;
          ideas.accepted[i].votes = await this.vote.getVotesForIdea(this.userId, this.projectId, ideaId);

          ideas.accepted[i].votes = this.sortVotes(ideas.accepted[i].votes);
        });
      }
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < ideas.rejected.length; i++) {
        const ideaId = ideas.rejected[i].ideaId;
        this.commentService.getCommentsForIdea(this.userId, this.projectId, ideaId).then(async (comments: any) => {
          // tslint:disable-next-line: prefer-for-of
          ideas.rejected[i].comments = comments;
          ideas.rejected[i].votes = await this.vote.getVotesForIdea(this.userId, this.projectId, ideaId);

          ideas.rejected[i].votes = this.sortVotes(ideas.rejected[i].votes);
        });
      }
      this.ideas = ideas;
    });
  }

  sortVotes(votes) {
    let upVote = 0;
    let downVote = 0;
    votes.forEach(vote => {
      if (vote.vote == true) {
        upVote ++;
      } else {
        downVote++;
      }
      if (vote.userId == this.userId) {
        vote.userVote = vote.vote;
      }
    });
    votes.upVote = upVote;
    votes.downVote = downVote;
    return votes;
  }
  upVote(id: number) {
    this.vote.voteOnIdea(this.userId, this.projectId, id, true).then(async () => {
      this.getIdeas();
    });
  }
  downVote(id: number) {
    this.vote.voteOnIdea(this.userId, this.projectId, id, false).then(() => {
      this.getIdeas();
    });
  }

  // Dialog Controllers
  openIdeaDialog(): void {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(IdeaBuilder, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newIdea = result.idea;
      this.createIdea();
    });
  }

  openCommentDialog(ideaId: any, comments: any): void {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(CommentBuilder, {
      width: '500px',
      // Pass in existing comments
      data: { ideaId, comments }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newComment = result.comment;
        this.createComment(ideaId);
      }
    });
  }

  openUserDialog(): void {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(UserBuilder, {
      width: '500px',
      data: { users: this.notProjectUsers }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addUser(result.userId);
      }
    });
  }
  openAdminDialog(): void {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(AdminBuilder, {
      width: '500px',
      data: { users: this.notAdminUsers }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addAdmin(result.userId);
      }
    });
  }

   // Handle drop events for columns
   drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      const idea = event.container.data[0] as any;
      this.ideaService.updateState(this.userId, this.projectId, idea.ideaId, event.container.id);
    }
  }
}


@Component({
  selector: 'idea-builder',
  templateUrl: 'idea-builder.html',
  styleUrls: ['./board.component.css']
})
export class IdeaBuilder {

  constructor(
    public dialogRef: MatDialogRef<IdeaBuilder>,
    @Inject(MAT_DIALOG_DATA) public data: IdeaDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'user-builder',
  templateUrl: 'user-builder.html',
  styleUrls: ['./board.component.css']
})
export class UserBuilder {

  constructor(
    public dialogRef: MatDialogRef<UserBuilder>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'comment-builder',
  templateUrl: 'comment-builder.html',
  styleUrls: ['./board.component.css']
})
export class CommentBuilder {

  constructor(
    public dialogRef: MatDialogRef<CommentBuilder>,
    @Inject(MAT_DIALOG_DATA) public data: CommentDialogData) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'admin-builder',
  templateUrl: 'admin-builder.html',
  styleUrls: ['./board.component.css']
})
export class AdminBuilder {

  constructor(
    public dialogRef: MatDialogRef<AdminBuilder>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

}
