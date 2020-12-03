import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { ProjectService } from '../../core/project.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  name: string;
  description: string;
  color: string;
}
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  user: any;
  projects: any;
  newProject: any;
  constructor(private auth: AuthService, private project: ProjectService, public dialog: MatDialog) { }

  async ngOnInit() {
    await this.auth.checkToken();
    this.user = this.auth.user;
    this.projects = await this.project.getUsersProjects(this.user.userId);
  }

  deleteProject(project: any) {
    this.project.deleteProject(this.user.userId, project.projectId).then(async () => {
      this.projects = await this.project.getUsersProjects(this.user.userId);
    });
  }
  updateProject(project: any, updates) {
    this.project.updateProject(this.user.userId, project.projectId, updates).then(async () => {
      this.projects = await this.project.getUsersProjects(this.user.userId);
    });
  }

  createProject() {
    this.project.createProject(this.user.userId, this.newProject).then(async () => {
      this.projects = await this.project.getUsersProjects(this.user.userId);
    })
  }

  openEditDialog(project?: any): void {
    console.log(project);
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(ProjectBuilder, {
      width: '500px',
      data: { name: project.name, description: project.description, color: project.color }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name && result.description && result.color) {
        this.updateProject(project, result);
      }
    });
  }
  openDialog(): void {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(ProjectBuilder, {
      width: '500px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name && result.description && result.color) {
        this.newProject = result;
        this.createProject();
      }
    });
  }

}


@Component({
  selector: 'project-builder',
  templateUrl: 'project-builder.html',
  styleUrls: ['./project.component.css']
})
export class ProjectBuilder {

  constructor(
    public dialogRef: MatDialogRef<ProjectBuilder>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
