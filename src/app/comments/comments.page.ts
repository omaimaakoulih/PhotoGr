import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalServiceService } from '../services/global-service.service';
import { Platform } from '@ionic/angular'; // to refresh the page


import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  comment!:string;
  user!:firebase.User;
  progress =0;

  constructor(private router:Router, private rout:ActivatedRoute, private globalSevice:GlobalServiceService, private platform:Platform) { 
    this.globalSevice.getCurrentUser().subscribe((data) => {
      if(data){
        this.user = data;
        console.log(this.user.uid);
      }
    })
  }

  ngOnInit() {
  }

  // use the post id as onSendComment() method argument 
   onSendComment(){

     setInterval(() => {
      this.progress += 0.01;
      if (this.progress > 1) {
        this.platform.ready().then(()=>{
          window.location.reload();
        })
      }
    }, 50);

    

  }
  back(){
    this.router.navigate(['tabs/tabs/home']);
  }
}
