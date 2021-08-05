import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Constants } from '../constants';
import { Observable } from 'rxjs';

export const TOKEN = 'token';
// lay roles
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class OauthLoginService {

  constructor(private http: HttpClient) { }

  basicJwtAuthLogin(user) {
    return this.http.post<any>(Constants.API_BASE_URL + '/api/auth/signin', user).pipe(
      map(
        data => {
          localStorage.setItem(TOKEN, `Bearer ${data.accessToken}`)
          return data;
        }
      )
    )
  }

  userSignup(user) {
    return this.http.post<any>(Constants.API_BASE_URL + '/api/auth/signup', user);
  }

  getVerificationLink(email) {
    return this.http.post<any>(Constants.API_BASE_URL + '/api/auth/send-email', email);
  }

  senMailHappyBirthDay(email){
    return this.http.post<any>(Constants.API_BASE_URL + '/api/auth/send-email-to-birthday', email);
  }

  getOtp(body) {
    return this.http.post<any>(Constants.API_BASE_URL + '/api/auth/generate-otp', body);
  }

  submitOtp(body) {
    return this.http.post<any>(Constants.API_BASE_URL + '/api/auth/validate-otp', body);
  }

  resetPassword(body) {
    return this.http.post<any>(Constants.API_BASE_URL + '/api/auth/reset-password', body);
  }

  getAuthToken() {
    if(localStorage.getItem(TOKEN))

      return localStorage.getItem(TOKEN)
  }
  setAuthToken(token) {
    localStorage.setItem(TOKEN, token);
  }

  isUserLoggedIn() {
    let token = localStorage.getItem(TOKEN)
    if(token === null || token.includes('undefined'))
      return false;
    else
      return true;
  }
  removeToken() {

    localStorage.removeItem(TOKEN)
  }

  signOut() {
    window.localStorage.clear();
  }

  saveUsers(user):void{
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUsers():any{
    return JSON.parse(localStorage.getItem(USER_KEY));
  }
}


