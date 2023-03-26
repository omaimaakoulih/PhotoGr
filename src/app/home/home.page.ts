import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router,private route: ActivatedRoute) {}
  onSignIn(){
    this.router.navigate(['login']);
  }
  onSignUp(){
    this.router.navigate(['signup']);
  }

}
