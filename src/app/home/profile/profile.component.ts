import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Component, OnInit, Injectable, Input } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { updateUser } from "src/app/model/updateUser";
import { OauthLoginService } from "src/app/services/oauth-login.service";
import { UserService } from "src/app/services/user.service";
import { ProfileDataService } from "../../services/data/profile-data.service";
import { SettingprofileComponent } from "../settingprofile/settingprofile.component";



@Injectable()
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {

  userName:any;
  email:any;
  id: any;
  profileUser:any;
  avatarSrc: any;
  dob:any;
  isBirthDay:any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private routerA: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private oauthService: OauthLoginService
  ) {
    this.id = this.oauthService.getUsers().id;

  }

  ngOnInit(): any {
    this.userName = localStorage.getItem("userName");
    this.email = localStorage.getItem("email");
    this.userService.getUser(this.id)
      .subscribe(data => {
        console.log(data)// format dob ở đây

        this.dob = new Date().toLocaleDateString();
        // if(this.dob = this.isBirthDay){
        //   this.oauthService.senMailHappyBirthDay(this.email);
        // }

        this.profileUser = data;
        this.avatarSrc = this.profileUser.avatar
      }, error => console.log(error));
  }

  public editProfile() {
    this.router.navigate(['home/setting']);
  }

}
