import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { GlobalServiceService } from '../services/global-service.service';
import { DbServiceService } from '../services/db-service.service';
import { Post } from '../models/post';
import { log } from 'console';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user!: firebase.User;
  postsInfo:number[] = [];
  posts !:Post[];

  constructor(private auth:AngularFireAuth, private globalService:GlobalServiceService, private dbService:DbServiceService, private router:Router, private rout:ActivatedRoute) {
    this.globalService.getCurrentUser().subscribe((data) => {
      if(data){
        this.user = data;
        console.log(this.user.displayName);
        this.dbService.getNumberOfLikes(this.user.uid).subscribe((d)=> {
          this.postsInfo = d;
          console.log(this.postsInfo);
        });
        this.dbService.getuserPosts(this.user.uid).subscribe((p) => {
          this.posts = p;
        })
      }
    });
   }

  ngOnInit() {
    /*if(this.user){
     this.dbService.getNumberOfLikes(this.user.uid).subscribe((d)=> {
      this.postsInfo = d;
      console.log(this.postsInfo);
    })
    }*/
    
  }
  onClick(){
    console.log("clicked !");
  }

  range(end: number) {
    return Array.from({length: end}, (_, i) => i);
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

}
