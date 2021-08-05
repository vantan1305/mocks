import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  getManager():Observable<any>{
    return this.http.get(Constants.API_BASE_URL + '/api/role/manager', {responseType: 'text'});
  }
}
