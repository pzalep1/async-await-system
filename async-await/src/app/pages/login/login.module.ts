import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule, ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    RouterModule
  ],
  providers: [],
})
export class LoginModule { }
