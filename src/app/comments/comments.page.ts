import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalServiceService } from '../services/global-service.service';
import { Platform, ToastController } from '@ionic/angular'; // to refresh the page
import { Comment } from '../models/comment';

import firebase from 'firebase/compat/app';
import { Post } from '../models/post';
import { DbServiceService } from '../services/db-service.service';
import { switchMap } from 'rxjs/operators';
import { UserModel } from '../models/usermodel';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  comment!:string;
  comments!:Comment[];
  post!:Post;
  userPost!:UserModel;
  user!:firebase.User;
  private sub:any;
  progress =0;

  constructor(private router:Router, private rout:ActivatedRoute, private globalSevice:GlobalServiceService, private platform:Platform, private dbService:DbServiceService, private toast:ToastController) { 
    this.globalSevice.getCurrentUser().subscribe((data) => {
      if(data){
        this.user = data;
        console.log(this.user.uid);
      }
    });
    

    this.sub = this.rout.params.pipe(
      switchMap((param) => {
        this.post = JSON.parse(param['post']);
        console.log(this.post);
        this.dbService.getUserById(this.post.userId).subscribe((u) => {
          this.userPost = u;
          console.log(this.userPost);
        })
        return this.dbService.getPostComments(this.post.postId);
      })
    ).subscribe((data) => {
      this.comments = data;
      console.log(this.comments);
    });
  }

  ngOnInit() {
    
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // use the post id as onCommentPost() method argument 
   async onSendComment(){
    if(this.comment){
     this.dbService.onCommentPost(this.comment,this.post.postId, this.user.uid);
     setInterval(() => {
      this.progress += 0.01;
      if (this.progress > 1) {
        this.platform.ready().then(()=>{
          console.log("reload");
          window.location.reload();
        })
      }
    }, 50);
    }
    else{
      const toast = await this.toast.create({
        message: 'the comment should not be empty!',
        duration: 1500,
        position: 'top'
      });
  
      (await toast).present();
    }

    

  }
  back(){
    this.router.navigate(['tabs/tabs/home']);
  }
}
