import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import firebase from 'firebase/compat/app';
import { map, Observable } from 'rxjs';
import auth  from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import * as admin from 'firebase-admin';
import 'firebase/database';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  user!:firebase.User;

  constructor(private fauth:AngularFireAuth, private firestore: AngularFirestore, private db:AngularFireDatabase) {

    firebase.initializeApp(environment.firebaseConfig);
    /*const admin = require('firebase-admin');
    const serviceAccount = require('../../assets/json/photogr-9e160-firebase-adminsdk-6fqdz-d2dca7a40b.json');

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    // });*/
   }

  getCurrentUser(): Observable<firebase.User | null> {
    return this.fauth.authState;
  }

  getUserData(uid: string): Observable<firebase.User> {
    return this.db.object(`users/PaHbswrOwIMkQCpmeOpIaEvyuTn2`).valueChanges().pipe(
      map((userData: any) => {
        // Do any necessary processing of the user data here
        console.log("test");
        return userData;
        
      })
    );
  }

  /*getUserById(uid:string){

    admin.auth().getUser(uid)
    .then(function(userRecord) {
      // User found.
      console.log("User found:", userRecord.toJSON());
    })
    .catch(function(error) {
      // Error fetching user.
      console.log("Error fetching user data:", error);
    });
  

  
}*/

 

}
