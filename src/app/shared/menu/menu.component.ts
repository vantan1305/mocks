import { Component, OnInit, Input } from '@angular/core';
import { OauthLoginService } from '../../services/oauth-login.service';
import { ProfileDataService } from 'src/app/services/data/profile-data.service';
import { LoginComponent } from 'src/app/login/login.component';
import { UserService } from 'src/app/services/user.service';
import { MatSidenav } from '@angular/material/sidenav';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private roles : string[];
  invalidLogin = false;
  showAdminBoard = false;
  showManagerBoard = false;
  showPmBoard = false;
  showUserBoard = false;
  id:any;
  userName: any;
  _profileUser:any;
  public isOpened = false;
  public totalStudents = 0;
  sidenav!: MatSidenav;
  avatar: any;

  constructor(
    private oauthLogin: OauthLoginService,
    private userService: UserService,
  ) {
    this.id = this.oauthLogin.getUsers().id;
    }

  ngOnInit() {
    this.userService.getUser(this.id)
      .subscribe(data => {
        console.log(data)
        this._profileUser = data;
      }, error => console.log(error));

    this.invalidLogin = !!this.oauthLogin.getAuthToken();

    if(this.invalidLogin){
      const user = this.oauthLogin.getUsers();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showManagerBoard = this.roles.includes('ROLE_MANAGER');
      this.showPmBoard = this.roles.includes('ROLE_PM');
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.userName = user.userName;
    }
  }



}
