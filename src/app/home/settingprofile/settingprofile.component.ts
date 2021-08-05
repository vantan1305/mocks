import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Directive } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { updateUser } from 'src/app/model/updateUser';
import { OauthLoginService } from 'src/app/services/oauth-login.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-settingprofile',
  templateUrl: './settingprofile.component.html',
  styleUrls: ['./settingprofile.component.css']
})
export class SettingprofileComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private routerA: ActivatedRoute,
    private userService: UserService,
    private oauthService: OauthLoginService,
    private fb: FormBuilder,
  ) {
    this.users = new updateUser();
    this.id = this.oauthService.getUsers().id;
    this.password = this.oauthService.getUsers().password;

}
  password: any;
  id: any;
  users: updateUser;
  ngOnInit() {

    console.log(this.id)

    this.userService.getUser(this.id)
      .subscribe(data => {
        console.log(data)
        this.users = data;
      }, error => console.log(error));
  }

  selectFile($event){
    this.users.avatar = $event.target.files[0].name;
  }


  public updateProfile():void{
    // debugger
    const formData = new FormData();
    formData.append('avatar', this.users.avatar);
    formData.append('email', this.users.email);
    formData.append('specialized', this.users.specialized);
    formData.append('phone', this.users.phone);
    formData.append('staffType', this.users.staffType);
    formData.append('identityCard', this.users.identityCard);
    formData.append('homeTown', this.users.homeTown);
    formData.append('education', this.users.education);
    formData.append('school', this.users.school);
    formData.append('dob', this.users.dob);
    formData.append('firstName', this.users.firstName);
    formData.append('lastName', this.users.lastName);
    formData.append('middleName', this.users.middleName);
    formData.append('sex', this.users.sex);
    console.log(formData);
    if(this.id !== 1){
      formData.append('id', `${this.id}`);
      formData.append('password', `${this.password}`);
    }
    this.userService.updateUserProfile(formData).subscribe(
      data =>{
        this.users = data;
        console.log('ok', data);
        alert('ok');
        this.router.navigate(['home/profile']);
      }, (error: any) => {
        alert('Thất bại');
        console.log(error);
      }
    );
  }

}
