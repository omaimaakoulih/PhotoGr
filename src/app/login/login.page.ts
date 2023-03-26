import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbServiceService } from '../services/db-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private router:Router, private rout:ActivatedRoute, private dbService:DbServiceService) { 
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.email]),
      password: new FormControl('',[Validators.minLength(8)])
    })
  }

  ngOnInit() {
  }

  onSingnIn(){
    this.dbService.signIn(this.loginForm.value.email, this.loginForm.value.password);

  }

 signUp(){
  this.router.navigate(['signup']);
 }

}
