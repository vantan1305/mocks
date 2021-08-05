import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class PmService {

  constructor(private http: HttpClient) { }

  getPm():Observable<any>{
    return this.http.get(Constants.API_BASE_URL + '/api/role/pm', {responseType: 'text'});
  }
}
