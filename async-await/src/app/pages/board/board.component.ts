import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../core/project.service';
import { IdeaService } from '../../core/idea.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
  ) { }

  async ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.projectId = this.route.snapshot.paramMap.get('projectId');
   // Get the project so we have the name and description
    this.project = await this.projectService.getProject(this.userId, this.projectId);
    this.ideas = await this.ideaService.getIdeasForAProject(this.userId, this.projectId);
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
      const idea = event.container.data[0];
      this.ideaService.updateState(this.userId, this.projectId, idea.ideaId, event.container.id)
    }
  }

  createIdea() {
    this.ideaService.createIdea(this.userId, this.projectId, this.newIdea).then(async () => {
      this.ideas = await this.ideaService.getIdeasForAProject(this.userId, this.projectId);
    });
  }
  deleteIdea(ideaId: any) {
    this.ideaService.deleteIdea(this.userId, this.projectId, ideaId).then(async () => {
      this.ideas = await this.ideaService.getIdeasForAProject(this.userId, this.projectId);
    });
  }
  createComment(ideaId: any) {
    console.log('hello')
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

  openCommentDialog(): void {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(CommentBuilder, {
      width: '500px',
      // Pass in existing comments
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newComment = result.comment;
      this.createComment('2');
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
