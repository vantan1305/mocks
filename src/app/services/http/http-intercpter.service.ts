import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OauthLoginService } from '../oauth-login.service';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercpterService implements HttpInterceptor {

  constructor(
    private oauthService: OauthLoginService,
    private jwtHelperService:JwtHelperService
    ) { }

  // intercept(req: HttpRequest<any>, next: HttpHandler) {

  //   let authToken = this.oauthService.getAuthToken();
  //   if(authToken != null) {
  //     req = req.clone({
  //       setHeaders: {
  //         Authorization: authToken
  //       }
  //     })
  //   }

  //   return next.handle(req);
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token && this.jwtHelperService.isTokenExpired(token, new Date().getTime())){
      request = request.clone({headers: request.headers.set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')});
    }
    return next.handle(request);
  }

}

// ???
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpIntercpterService, multi: true }
];
