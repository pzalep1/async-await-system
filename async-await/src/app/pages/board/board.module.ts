import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent, CommentBuilder, IdeaBuilder } from './board.component';
import { FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [BoardComponent, IdeaBuilder, CommentBuilder],
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
    DragDropModule,
  ],
  entryComponents: [BoardComponent, IdeaBuilder, CommentBuilder]
})
export class BoardModule { }
