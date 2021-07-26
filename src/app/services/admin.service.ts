import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAdminBoard():Observable<any>{
    return this.http.get(Constants.API_BASE_URL + '/api/role/admin', {responseType: 'text'});
  }
}
