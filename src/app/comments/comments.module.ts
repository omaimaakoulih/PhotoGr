import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentsPageRoutingModule } from './comments-routing.module';

import { CommentsPage } from './comments.page';
import { DateTimePipeMod } from '../pipes/dateTimePipemod.module';
import { UserCommentComponent } from '../user-comment/user-comment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentsPageRoutingModule,
    DateTimePipeMod
  ],
  declarations: [CommentsPage, UserCommentComponent]
})
export class CommentsPageModule {}
