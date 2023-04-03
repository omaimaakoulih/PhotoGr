import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostsPageRoutingModule } from './posts-routing.module';

import { PostsPage } from './posts.page';
import { CutePipe } from '../pipes/cutePipe';
import { DateTimePipeMod } from '../pipes/dateTimePipemod.module';
import { CutePipeMod } from '../pipes/cutePipeMod.module';
import { UserPostComponent } from '../user-post/user-post.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostsPageRoutingModule,
    DateTimePipeMod,
    CutePipeMod

  ],
  declarations: [PostsPage,UserPostComponent]
})
export class PostsPageModule {}
