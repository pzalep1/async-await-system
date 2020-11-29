import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { ProjectService } from 'src/app/core/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  user: any;
  projects: any;
  constructor(private auth: AuthService, private project: ProjectService) { }

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

  createProject() {
    const project = {name: 'Example Project', description: 'This is just a project', color: '#fe36c0'};
    this.project.createProject(this.user.userId, project).then(async () => {
      this.projects = await this.project.getUsersProjects(this.user.userId);
    });
  }

}
