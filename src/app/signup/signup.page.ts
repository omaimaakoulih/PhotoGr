import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DbServiceService } from '../services/db-service.service';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signUpForm!:FormGroup;
  constructor(private formBuilder:FormBuilder ,private dbService:DbServiceService, private toast:ToastController, private router:Router, private rout:ActivatedRoute) { 

    this.signUpForm  = this.formBuilder.group({
      userName: new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    
  }

  async onSignUp(position:'top'){
    await this.dbService.signUp(this.signUpForm.value.email, this.signUpForm.value.password, this.signUpForm.value.confirmPassword, this.signUpForm.value.userName);
    const toast =  await this.toast.create({
      message: 'Account succussfuly created!',
      duration: 1500,
      position: position
    });

     (await toast).present();
     this.router.navigate(['login']);
  }

  signIn(){
    this.router.navigate(['login']);
  }

}
