import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsPage } from '../posts/posts.page';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../posts/posts.module').then((m) => m.PostsPageModule),
      },
      {
        path: 'likes',
        loadChildren: () => import('../likes/likes.module').then((m) => m.LikesPageModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then((m) => m.ProfilePageModule),
      }
    ]

  },
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
