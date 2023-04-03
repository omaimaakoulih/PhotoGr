import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { DbServiceService } from '../services/db-service.service';
import { firstValueFrom, switchMap } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import  firebase from 'firebase/compat/app';
import { GlobalServiceService } from '../services/global-service.service';
import { UserModel } from '../models/usermodel';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss'],
})
export class UserPostComponent  implements OnInit {

  @Input()
  p!:Post;

  user!:firebase.User;
  userPost!:UserModel;

  constructor(private dbService:DbServiceService, private router:Router, private rout:ActivatedRoute,private auth: AngularFireAuth, private globalService:GlobalServiceService) {
    
    this.globalService.getCurrentUser().subscribe((data) => {
      if(data){
        this.user = data;
        console.log(this.user.uid);
      }
    });
   
   }


  ngOnInit() {
    this.dbService.getUserById(this.p.userId).subscribe((data) => {
      this.userPost = data;
      console.log(this.userPost);
    });
  }

  // on like the post : 
  async onLike(p:Post,uid:string){

    const result =await firstValueFrom(this.dbService.getlikeActions());
     /*await this.dbService.getlikeActions().subscribe((data)=> {
       this.likedActions = data;
      
    });*/
    if(result){
       this.dbService.onLikePost(p,uid,result);
    }
    else{
      this.dbService.onLikePost(p,uid,[]);
    }
  }
  comment(p:Post){
    console.log(p);
    this.router.navigate(['comments',JSON.stringify(p)]);
  }
  async onSave(p:Post, uid:string){
    const result = await firstValueFrom(this.dbService.getsaveActions());

    if(result){
      this.dbService.onSavePost(p,uid,result);
    }
    else{
      this.dbService.onSavePost(p, uid,[]);
    }
  }

}
