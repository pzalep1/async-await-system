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
  passwordMessage: string;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.emailError = false;
    this.passwordError = false;
    this.firstNameError = false;
    this.lastNameError = false;

    this.passwordStrong; 

    if (!this.email) {
      this.emailError = true;
      this.emailMessage = 'Please provide an email';
      return;
    }
    if (!this.password) {
      this.passwordError = true;
      this.passwordMessage = 'Must include a password';
      return;
    }
    if (!this.firstName.trim()) {
      this.firstNameError = true;
      return;
    }
    if (!this.lastName.trim()) {
      this.lastNameError = true;
      return;
    }
    // Validate the email

    if(!this.emailIsValid) {
      this.emailError = true;
      this.emailMessage = 'Not a valid email';
      return;
    }
    if(!this.passwordStrong) {
      this.passwordError = true;
      this.passwordMessage = 'Password not strong enough';
    }

    this.auth.register(
      { fName: this.firstName,
        lName: this.lastName,
        email: this.email,
        password: this.password
      }).then(() => {
        this.router.navigate(['/login']);
      }).catch(err => {
        if (err.status === 409) {
          this.emailTaken = true;
          this.emailMessage = 'Email already in use';
        }
      });
  }

  get emailIsValid(): boolean {
    const valid = this.email.match(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi
    );
    if (valid === null) {
      return false; 
    } else {
      return true;
    }
  }

  get passwordStrong(): boolean{
    const targetLength = 8;
    const strongLength = 18;

    const hasLetter = this.password.match(/[a-z]/gi).length;
    const capitalLetterCount = this.password.match(/[A-Z]/gi).length || 0;
    const numberCount = this.password.match(/[0-9]+/).length || 0;
    const symbolCount =
      this.password.match(/[$-/:-?{-~!#@"^_`\\\[\]]/gi).length || 0;

    if (this.password.length < targetLength) {
      return false;
    }

    const normalize = (
      targetLowerBound: number,
      targetUpperBound: number,
      minValue: number,
      maxValue: number,
      value: number
    ): number => {
      return (
        (targetUpperBound - targetLowerBound) *
          ((value - minValue) / (maxValue - minValue)) +
        targetLowerBound
      );
    };

    const strength =
      normalize(1, 4, targetLength, strongLength, this.password.length) +
      capitalLetterCount * (hasLetter ? 0.5 : 0.25) +
      numberCount * (hasLetter ? 0.65 : 0.4) +
      symbolCount * (hasLetter ? 0.75 : 0.5);

    if (strength > 5) {
      console.log('yee yee ')
      return true;
    };
  }

}
