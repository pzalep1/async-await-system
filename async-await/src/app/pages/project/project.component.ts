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

  logout() {
    this.auth.logout();
    document.location.href = 'http://witchofwcag.tech:4200/login';
  }

  createProject() {
    this.project.createProject(this.user.userId, this.newProject).then(async () => {
      this.projects = await this.project.getUsersProjects(this.user.userId);
    });
  }

  updateUser() {
    this.auth.updateUser(this.user);
  }

  openEditDialog(project?: any): void {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(ProjectBuilder, {
      width: '500px',
      data: { name: project.name, description: project.description, color: project.color, editing: true }
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
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.name && result.description && result.color) {
        this.newProject = result;
        this.createProject();
      }
    });
  }

  openUserDialog(project?: any): void {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.dialog.open(UserInfoBuilder, {
      width: '500px',
      data: { user: this.user }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user = result.user;
      this.auth.user = result.user;
      if (result) {
        this.updateUser();
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

@Component({
  selector: 'user-info-builder',
  templateUrl: 'user-info-builder.html',
  styleUrls: ['./project.component.css']
})
export class UserInfoBuilder {

  constructor(
    public dialogRef: MatDialogRef<UserInfoBuilder>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
