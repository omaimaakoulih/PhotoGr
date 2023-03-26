import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostsPageRoutingModule } from './posts-routing.module';

import { PostsPage } from './posts.page';
import { CutePipe } from '../pipes/cutePipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostsPageRoutingModule
  ],
  declarations: [PostsPage, CutePipe]
})
export class PostsPageModule {}
