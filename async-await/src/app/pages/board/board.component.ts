import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../core/project.service';
import { IdeaService } from '../../core/idea.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
      // TODO: Update the status of the idea
    }
  }

  createIdea() {
    this.ideaService.createIdea(this.userId, this.projectId, this.newIdea);
  }
  deleteIdea() {
    
  }
}
