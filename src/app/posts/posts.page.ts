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
import { DbServiceService } from '../services/db-service.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  user$!: Observable<string>;
  user!: firebase.User;
  displayName!:string;
  name!: string;
  post!:Post;
  image!:string;
  selectedFile!:File;
  description!:string;
  posts:Post[] = [];
  constructor(private router:Router, private rout:ActivatedRoute, private fireStore:Firestore,private postPiblish:PublishPostService, private globalSevice:GlobalServiceService, private dbService:DbServiceService, private db:AngularFireDatabase) {
    this.globalSevice.getCurrentUser().subscribe((data) => {
      if(data){
        this.user = data;
        console.log(this.user.uid);
      }
    });
    
    this.dbService.getPosts().subscribe((data) => {
      this.posts = data;
    })
   }

  ngOnInit() {
  }
  
 

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.post = new Post(this.user.uid, this.description, Date.now(),0);
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
  comment(){
    this.router.navigate(['comments']);
  }
  onSave(){

  }

  writeUserInfos(uid: string): Observable<string> {
    return this.db.object(`users/${uid}`).valueChanges().pipe(
      map((userData: any) => {
        // Do any necessary processing of the user data here
        console.log("hello1");
        return userData.displayName;
      })
    );
  }
  
  getpostUser(uid: string): Observable<string> {
    return this.writeUserInfos(uid).pipe(
      map((user: string) => {
        console.log("hello test au");
        return user || '';
      })
    );
  }
  
  getThedisplayName(uid: string): Observable<string> {
    console.log("top");
    return this.getpostUser(uid).pipe(
      tap((displayName: string) => {
        this.displayName = displayName;
        console.log(this.displayName);
      })
    );
  }
  

  testSubscribe(uid:string){
    const displayName = this.getThedisplayName(uid).subscribe((data) =>{
      this.displayName = data;
      
    });
    console.log(this.displayName);
  }

   
  

}
