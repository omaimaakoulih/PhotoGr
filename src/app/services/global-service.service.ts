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



 

}
