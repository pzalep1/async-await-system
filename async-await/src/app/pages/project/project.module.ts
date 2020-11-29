import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
  ]
})
export class ProjectModule { }
