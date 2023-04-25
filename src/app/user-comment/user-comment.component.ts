import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../models/comment';
import { DbServiceService } from '../services/db-service.service';
import { UserModel } from '../models/usermodel';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-user-comment',
  templateUrl: './user-comment.component.html',
  styleUrls: ['./user-comment.component.scss'],
})
export class UserCommentComponent  implements OnInit {


  @Input()
  c!:Comment;
  
  user!:UserModel;
  constructor(private dbService: DbServiceService) {
    
    
   }

  ngOnInit() {
    console.log(this.c);
    this.dbService.getUserById(this.c.iduserComment).subscribe((u) => {
      this.user = u;
      console.log(this.user);
    })
  }

}
