import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublishPostService } from '../services/publish-post.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../models/post';
import { Firestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { GlobalServiceService } from '../services/global-service.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  user!: firebase.User;

  name!: string;
  post!:Post;
  image!:string;
  selectedFile!:File;
  description!:string;
  constructor(private router:Router, private rout:ActivatedRoute, private fireStore:Firestore,private postPiblish:PublishPostService, private globalSevice:GlobalServiceService) {
    this.globalSevice.getCurrentUser().subscribe((data) => {
      if(data){
        this.user = data;
        console.log(this.user.uid);
      }
    })
   }

  ngOnInit() {
  }
  
  comment(){
    this.router.navigate(['comments']);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.post = new Post(this.user.uid, this.description);
    this.postPiblish.onPost(this.post, this.selectedFile);
    
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log("confirm");
    }
  }

  onSelectImage(event: any){
    this.selectedFile = event.target.files[0];
  }


  // on like the post : 
  onLike(){

  }
  

}
