import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OauthLoginService } from '../services/oauth-login.service';
import { isObject } from 'util';
import { NotificationService } from '../services/notification.service';
import { Constants } from '../constants';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: any;
  errorMessage: string
  invalidLogin: boolean = false;
  loginForm: FormGroup
  rememberMe: boolean = false;
  display = 'none'
  verifyModalData = {}
  // khai bao role
  roles: string[] = [];
  id;

  constructor(private router:Router,
              private fb: FormBuilder,
              private oauthService: OauthLoginService,
              private notifyService: NotificationService,
              private jwt : JwtHelperService
           ){}

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required]
    })
    if(localStorage.getItem("userName") && localStorage.getItem("password")){
      this.loginForm.patchValue({
        userName: localStorage.getItem("userName"),
        password : localStorage.getItem("password")
      });
    }
    //???
    if(this.oauthService.getAuthToken()){
      this.invalidLogin = true;
      this.roles = this.oauthService.getUsers().roles;
    }
    this.setVerifyModalData();
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  getLogo() {
    return Constants.LOGO_URL;
  }
  getAddon() {
    return Constants.ADDON_URL;
  }



  onSubmit() {
    let user = this.loginForm.value;
    this.oauthService.basicJwtAuthLogin(user).subscribe(
      response => {
        const token = response.token;
        localStorage.setItem("userName",this.jwt.decodeToken(token).userName);
        localStorage.setItem("email", this.jwt.decodeToken(token).email);
        this.oauthService.saveUsers(response);
        console.log(response)
        this.notifyService.showToast("logged in successfully!", 'success');
        this.invalidLogin = false;
        this.roles = this.oauthService.getUsers().roles;
        this.id = this.oauthService.getUsers().id;
        this.saveCredentials();
        this.router.navigate(['home'])
      },
      error => {
        this.invalidLogin = true;
        if(error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = "Unknown error occured, try after some time..";
        }
      }
    )
  }

  toggleValue(event) {
    if(event.target.checked) {
      this.rememberMe = true;
    }
  }

  saveCredentials() {
    if(this.rememberMe) {
      localStorage.setItem("userName", this.loginForm.value.userName)
      localStorage.setItem("password", this.loginForm.value.password)
    }
  }
  openVerifyEmailModal() {
    this.setVerifyModalData('Verify email', 'Send link', 'verify');
    this.display = 'block';
  }
  openForgotPassModal() {
    this.setVerifyModalData('Reset Password', 'Send OTP', 'reset');
    this.display = 'block';
  }
  eventDisplay(event) {
    this.display = 'none';
  }
  setVerifyModalData(title:string = '', btn: string = '', type: string = '') {
    this.verifyModalData = {
      title: title,
      btn: btn,
      type: type
    }
  }
}
