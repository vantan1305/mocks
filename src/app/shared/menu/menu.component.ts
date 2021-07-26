import { Component, OnInit, Input } from '@angular/core';
import { OauthLoginService } from '../../services/oauth-login.service';
import { ProfileDataService } from 'src/app/services/data/profile-data.service';
import { LoginComponent } from 'src/app/login/login.component';

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

  // @Input() user: Users;
  userName: any;
  constructor(
    private oauthLogin: OauthLoginService
  ) {
      // this.userName = localStorage.getItem("userName");
    }

  ngOnInit() {
    // console.log(this.user);
    this.invalidLogin = !!this.oauthLogin.getAuthToken();

    if(this.invalidLogin){
      const user = this.oauthLogin.getUsers();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showManagerBoard = this.roles.includes('ROLE_MANAGER');
      this.showPmBoard = this.roles.includes('ROLE_PM');

      this.userName = user.userName;
    }
  }

}
