import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublishPostService } from '../services/publish-post.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { Post } from '../models/post';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import  firebase from 'firebase/compat/app';
import { GlobalServiceService } from '../services/global-service.service';
import { DbServiceService } from '../services/db-service.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { firstValueFrom, lastValueFrom, map, Observable, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { LikeAction } from '../models/likeAction';
import 'firebase/compat/auth';
import 'firebase/auth';
import * as admin from 'firebase-admin';
import { UserModel } from '../models/usermodel';

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
  userPost!:UserModel;
  postUserName!:string;
  postUserImage!:string;
  likedActions: LikeAction[]= [];
  constructor(private router:Router, private rout:ActivatedRoute, private fireStore:Firestore,private postPiblish:PublishPostService, private globalSevice:GlobalServiceService, public dbService:DbServiceService, private db:AngularFireDatabase, private auth: AngularFireAuth) {
    this.globalSevice.getCurrentUser().subscribe((data) => {
      if(data){
        this.user = data;
        console.log(this.user.uid);
      }
    });
    
    this.dbService.getPosts().subscribe((data) => {
      this.posts = data;
    });

    /*********************************
    const serviceAccount = require('../../assets/json/adminPhotoGr.json');

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
    });*/

    
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
  onSave(p:Post){
    
  }
  /*
   getUserById(uid:string):UserModel{

    const collectionInstance = collection(this.fireStore, 'user');
    
      collectionData(collectionInstance, { idField: 'id' }).subscribe
      ((val) => {
        val.forEach(v => {
          if(v['uid'] == uid){
            this.userPost = new UserModel(v['uid'],v['userName'],v['email'],v['image']);
          }
        });
        console.log("test observable");
       
      });
      return this.userPost
  }*/
  getUserById(uid: string): Observable<UserModel> {
    const collectionInstance = collection(this.fireStore, 'user');
    const collectionData$ = collectionData(collectionInstance, { idField: 'id' });
  
    return this.dbService.getUserById(uid).pipe(
      switchMap((user: UserModel) => {
        return collectionData$.pipe(
          map((val) => {
            val.forEach(v => {
              if (v['uid'] == uid) {
                user.image = v['image'];
              }
            });
            console.log(user);
            return user;
          })
        );
      })
    );
  }
  
  


  

}
