import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public getUserBoard():Observable<any>{
    return this.http.get(Constants.API_BASE_URL + '/api/role/user',
     {observe: 'body'})
     .pipe(catchError((err) => throwError(err)));;
  }

  public uploadImage(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', Constants.API_BASE_URL + '/image/avatar', formData,
    {reportProgress: true,
     responseType:'json'});
    return this.http.request(req);
    // return this.http.post(Constants.API_BASE_URL + '/image/uploadFile' ,formData , {reportProgress: true, responseType:'json'})
    // .pipe(catchError((err) => throwError(err)));
  }

  // getFiles(): Observable<any> {
  //   return this.http.get(Constants.API_BASE_URL + '/image/file');
  // }
}
