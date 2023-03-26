import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor(private angularFireAuth:AngularFireAuth, private router:Router, private rout:ActivatedRoute, private toast:ToastController) { }

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
}
