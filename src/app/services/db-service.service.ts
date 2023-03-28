import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { map, Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor(private angularFireAuth:AngularFireAuth, private router:Router, private rout:ActivatedRoute, private toast:ToastController, private firestore:Firestore) { }

  async signIn(email:string, password:string){
    try{
    await this.angularFireAuth.signInWithEmailAndPassword(email,password).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.user));
       });
      }catch(error){
        const toast =  await this.toast.create({
          message: 'invalid email or password !',
          duration: 1500,
          position: 'bottom'
        });
    
         (await toast).present();
      }

  }

  async signUp(email:string, password:string, confirmPassword: string, userName:string){

    if(password == confirmPassword){
    await this.angularFireAuth.createUserWithEmailAndPassword(email,password).then((res) => {
      res.user?.updateProfile({
        displayName: userName
      });
      localStorage.setItem('user', JSON.stringify(res.user));
      
    })
    
   }
   else{
    const toast =  await this.toast.create({
      message: 'invalid password !',
      duration: 1500,
      position: 'bottom'
    });

     (await toast).present();
   }
  }

  getPosts(): Observable<Post[]> {
    let posts: Post[] = [];
    let post!: Post;
    const collectionInstance = collection(this.firestore, 'posts');
    
    return collectionData(collectionInstance, { idField: 'id' }).pipe(
      map((val) => {
        val.forEach(v => {
          post = new Post(v['userId'], v['description'], v['date'], v['likes'], v['image']);
          if(!posts.some((s) => s.userId == post.userId && s.description == post.description && s.date== post.date && post.likes == s.likes && s.image == post.image)){
            posts.push(post);
          }
          
        });
        return posts;
      })
    );
  }
}
