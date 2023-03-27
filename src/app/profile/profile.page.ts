import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { GlobalServiceService } from '../services/global-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user!: firebase.User;
  constructor(private auth:AngularFireAuth, private globalService:GlobalServiceService) {
    this.globalService.getCurrentUser().subscribe((data) => {
      if(data){
        this.user = data;
      }
    });
   }

  ngOnInit() {
    
  }
  onClick(){
    console.log("clicked !");
  }

}
