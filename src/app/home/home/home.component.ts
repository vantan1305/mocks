import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDTO } from 'src/app/model/userDTO';
import { OauthLoginService } from 'src/app/services/oauth-login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userid:any;
  id:any;
  dob:any;
  private roles : string[];
  invalidLogin = false;
  onParentLoaded: boolean = false;
  showAdminBoard =false;
  showManagerBoard = false;
  profileUser1:any;
  dd:any;
  mm:any;
  yyyy:any;
  p = 3;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private oauthService: OauthLoginService
    ) {
      // this.id = this.oauthService.getUsers().id;
  }

  ngOnInit() {
    this.userService.getUserBoard()
      .subscribe((data) => {
        console.log(data)// format dob ở đây

        // this.dob = new Date().toLocaleString();
        this.dob = new Date();
        this.dd = this.dob.getDate();
        this.mm = this.dob.getMonth()+1;
        this.yyyy = this.dob.getFullYear();
        if(this.dd<10)
          {
           this.dd='0'+ this.dd;
        }
        if(this.mm<10)
          {
            this.mm='0'+ this.mm;
        }
        this.dob = this.dd+'/'+this.mm+'/'+this.yyyy;
        if(this.invalidLogin){
          const user = this.oauthService.getUsers();
          this.roles = user.roles;
        }
        this.profileUser1 = data;

      }, error => console.log(error));
  }

  deletaData(){
  }

  editData(){}
}
