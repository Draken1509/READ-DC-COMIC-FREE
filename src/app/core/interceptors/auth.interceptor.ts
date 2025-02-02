import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.shouldInterceptRequest(request))
    {
      const authRequest = request.clone({
        setHeaders:{
          'Authorization': this.cookieService.get('Authorization')
        }
      }); 
      return next.handle(authRequest);  
    }
   return next.handle(request);
  }

  private shouldInterceptRequest(request: HttpRequest<any>):  boolean {
    return request.urlWithParams.indexOf('addAuth', 0) >-1 ?true : false;
  }

}
