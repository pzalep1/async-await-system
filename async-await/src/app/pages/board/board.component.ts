import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../core/project.service';
import { IdeaService } from '../../core/idea.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommentService } from '../../core/comment.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
export interface IdeaDialogData {
  idea: string;
}
export interface CommentDialogData {
  comment: string;
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

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    public dialog: MatDialog,
    private ideaService: IdeaService,
    private commentService: CommentService,
  ) { }

  async ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.projectId = this.route.snapshot.paramMap.get('projectId');
   // Get the project so we have the name and description
    this.getIdeas();
    this.project = await this.projectService.getProject(this.userId, this.projectId);
    // this.ideas = await this.ideaService.getIdeasForAProject(this.userId, this.projectId);
  }

  // Handle drop events
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
      data: { comments }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newComment = result.comment;
        this.createComment(ideaId);
      }
    });
  }

  getIdeas() {
    this.ideaService.getIdeasForAProject(this.userId, this.projectId).then((ideas: any) => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < ideas.review.length; i++) {
        const ideaId = ideas.review[i].ideaId;
        this.commentService.getCommentsForIdea(this.userId, this.projectId, ideaId).then((comments) => {
          ideas.review[i].comments = comments;
        });
      }
      this.ideas = ideas;
    });
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
