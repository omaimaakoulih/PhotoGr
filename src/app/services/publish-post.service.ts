import { Injectable } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { addDoc, collection } from '@firebase/firestore';
import { IonModal, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { from, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PublishPostService {
  
  constructor(private router:Router, private rout:ActivatedRoute, private fireStore:Firestore, private storage:Storage, private toast:ToastController){}

  onPost(post: any, selectedFile:File){

    // add the post's image to firebase storage
    if(selectedFile){
      const storageRef = ref(this.storage,`posts/images/${selectedFile.name}`);
      const uploadTask = from(uploadBytes(storageRef,selectedFile));
      
  
         uploadTask.pipe(
        
          switchMap((result) => from(getDownloadURL(result.ref))),
          tap((url) => {
             post.image = url;

             
             // add to post db
              const collectionData =collection(this.fireStore, 'posts');
              addDoc(collectionData, JSON.parse(JSON.stringify(post))).then( async ()=>{
                const toast =  await this.toast.create({
                  message: 'Your post is ready!',
                  duration: 1500,
                  position: 'top'
                });
            
                (await toast).present();

              }).catch((err) => {
                console.log(err);
              });


            
            })).subscribe();

          
    
    }
  }


}
