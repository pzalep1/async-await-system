import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent, ProjectBuilder } from './project.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule, MatInputModule, MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { UserInfoBuilder } from './project.component';

@NgModule({
  declarations: [ProjectComponent, ProjectBuilder, UserInfoBuilder],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
  ],
  entryComponents: [ProjectComponent, ProjectBuilder, UserInfoBuilder]
})
export class ProjectModule { }
