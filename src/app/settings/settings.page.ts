import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../services/global-service.service';
import firebase from 'firebase/compat/app';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { log } from 'console';
import { DbServiceService } from '../services/db-service.service';
import { ifError } from 'assert';
import { user } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user!:firebase.User;
  settingForm!:FormGroup;
  userEmail!:string;
  userName!:string;
  selectedImage!:File;
  image!:string;
  constructor(private globalService:GlobalServiceService, private formBuilder: FormBuilder, private toast:ToastController, private dbService:DbServiceService, private rout:ActivatedRoute, private router: Router) { 
    
    this.settingForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      userName: new FormControl('',[Validators.required]),
      password: new FormControl(''),
      confPassword: new FormControl('')
    });

    this.globalService.getCurrentUser().subscribe((data) => {
      if(data){
        this.user = data;
        this.settingForm.get('email')?.setValue(this.user.email);
        this.settingForm.get('userName')?.setValue(this.user.displayName);
      }
      
    });
    
    
  }

  ngOnInit() {
  }

   onChange(){
   
    this.dbService.change(this.user,this.settingForm,this.selectedImage);
    
    
  }
  onSelectImage(event: any){
    this.selectedImage = event.target.files[0];
  }

  backButton(){
    this.router.navigate(['/tabs/tabs/profile']);
  }

}
