import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  emailError: boolean;
  emailNotFound: boolean;
  passwordError: boolean;
  emailMessage: string;
  user: any = {};

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.emailError = false;
    this.passwordError = false;
    if (!this.email) {
      this.emailError = true;
      this.emailMessage = 'Invalid email';
    }
    if (!this.password) {
      this.passwordError = true;
    }
    if (this.email && this.password) {
      this.auth.login({email: this.email, password: this.password}).then((val) => {
        this.user = val;
        this.router.navigate(['/users', this.user.userId, 'projects']);
      })
      .catch(err => {
        if (err.status === 401) {
          this.passwordError = true;
        }
        if (err.status === 404) {
          this.emailNotFound = true;
          this.emailMessage = 'Email not found';
        }
      });
    }

  }

}
