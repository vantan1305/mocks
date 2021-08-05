import { Component, OnInit } from '@angular/core';
import { OauthLoginService } from 'src/app/services/oauth-login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  id:any;
  profileUser:any;
  dob:any;

  constructor(
    private userService: UserService,
    private oauthService: OauthLoginService

  ) {
    this.id = this.oauthService.getUsers().id;
   }

  ngOnInit() {
    this.userService.getUser(this.id)
      .subscribe(data => {
        console.log(data)// format dob ở đây
        this.dob = new Date().toLocaleDateString();

        this.profileUser = data;
      }, error => console.log(error));
  }

}
