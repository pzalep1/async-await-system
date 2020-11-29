import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../core/project.service';
import { IdeaService } from '../../core/idea.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  idea: string;
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
  submittedIdeas: any;
  reviewIdeas: any[] = [];
  acceptedIdeas: any[] = [];
  rejectedIdeas: any [] = [];

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
    this.submittedIdeas = await this.ideaService.getIdeasForAProject(this.userId, this.projectId);
    console.log(this.submittedIdeas);
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
      console.log(event.container.id);
      // TODO: Update the status of the idea
    }
  }

  createIdea() {
    this.ideaService.createIdea(this.userId, this.projectId, this.newIdea).then(async () => {
      this.submittedIdeas = await this.ideaService.getIdeasForAProject(this.userId, this.projectId);
    });
  }
  deleteIdea(ideaId: any) {
    this.ideaService.deleteIdea(this.userId, this.projectId, ideaId).then(async () => {
      this.submittedIdeas = await this.ideaService.getIdeasForAProject(this.userId, this.projectId);
    });
  }

  openDialog(): void {
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
}


@Component({
  selector: 'idea-builder',
  templateUrl: 'idea-builder.html',
  styleUrls: ['./board.component.css']
})
export class IdeaBuilder {

  constructor(
    public dialogRef: MatDialogRef<IdeaBuilder>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
