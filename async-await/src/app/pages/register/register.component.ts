import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  // Errors
  emailError: boolean;
  passwordError: boolean;
  emailTaken: boolean;
  firstNameError: boolean;
  lastNameError: boolean;
  emailMessage: string;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.emailError = false;
    this.passwordError = false;
    this.firstNameError = false;
    this.lastNameError = false;

    if (!this.email) {
      this.emailError = true;
      this.emailMessage = 'Please provide an email';
    }
    if (!this.password) {
      this.passwordError = true;
    }
    if (!this.firstName) {
      this.firstNameError = true;
    }
    if (!this.lastName) {
      this.lastNameError = true;
    }
    this.auth.register(
      { fName: this.firstName,
        lName: this.lastName,
        email: this.email,
        password: this.password
      }).then((val) => {
        this.router.navigate(['/login']);
      }).catch(err => {
        if (err.status === 409) {
          this.emailTaken = true;
          this.emailMessage = 'Email already in use';
        }
      });
  }

}
