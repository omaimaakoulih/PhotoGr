import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  constructor(private router:Router, private rout:ActivatedRoute) { }

  ngOnInit() {
  }
  onSendComment(){

  }
  back(){
    this.router.navigate(['tabs/tabs/home']);
  }
}
