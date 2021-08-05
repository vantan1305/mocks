import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants';
import { Observable } from 'rxjs';

// export class Users {

//   userName : String;
//   email : String;
//   staffType : number;
//   avatar : String;
//   firstName : String;
//   middleName : String;
//   lastName : String;
//   phone : String;
//   identityCard : String;
//   homeTown: String;
//   school: String;
//   specialized : String;
//   emailVerified : boolean;
//   constructor(
// ) {}
// }

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {
  formData: any;
  f(f: any) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private http: HttpClient
    ) {}

  getUserInfo() {
    return this.http.get<any>(Constants.API_BASE_URL + '/api/role/user/all');
  }
}
