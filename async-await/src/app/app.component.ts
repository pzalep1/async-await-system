import { Component } from '@angular/core';
import { AuthService } from '../app/core/auth.service';
import { ProjectService } from './core/project.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'async-await';

  constructor(private auth: AuthService, private project: ProjectService) {}

  async ngOnInit() {

  }

  async login() {
    await this.auth.login({email: 'example65@example.com', password: 'password'});
  }

  async register() {
    await this.auth.register({ fName: 'Alexandra', lName: 'Paige', email: 'example65@example.com', password: 'password'});
  }

  async deleteUser() {
    await this.auth.deleteUser();
  }

  async getUserProject() {
    await this.project.getUsersProjects(this.auth.user.userId);
  }

  async getProjects() {
    this.project.getUsersProjects(10);

  }

  async checkToken() {
    await this.auth.checkToken();
  }

  async createProject() {
    const project = {name: 'Example Project', description: 'This is just a project', color: '#1c70dd'};
    await this.project.createProject(10, project);
  }
}
