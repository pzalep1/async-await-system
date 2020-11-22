import { Component } from '@angular/core';
import { AuthService } from '../app/core/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'async-await';

  constructor(private auth: AuthService) {}

  async ngOnInit() {
    await this.auth.register({ fName: 'Alexandra', lName: 'Paige', email: 'example65@example.com', password: 'password'});
    await this.auth.login({email: 'example65@example.com', password: 'password'});
    await this.auth.checkToken();
    await this.auth.deleteUser();
  }
}
