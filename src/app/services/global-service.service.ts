import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  user!:firebase.User;

  constructor(private auth:AngularFireAuth) { }

  getCurrentUser(): Observable<firebase.User | null> {
    return this.auth.authState;
  }
}
