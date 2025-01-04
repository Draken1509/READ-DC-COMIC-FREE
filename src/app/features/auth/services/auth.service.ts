
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-reponse.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);
  constructor(private http: HttpClient, private cookieService: CookieService) {

   
   }
   logout():void{
      localStorage.clear();
      this.cookieService.delete('Authorization','/');
      this.$user.next(undefined);
      
   }
   getUser(): User | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');
    const applicationUserId=localStorage.getItem('application-user-id');
    if(email && roles && applicationUserId)
    {
      const user: User ={
        email: email,
        applicationUserId:applicationUserId,
        roles: roles?.split(',')
      }
      return user;
    }
    return undefined;
  }
  login(request : LoginRequest): Observable<LoginResponse>{
    console.log("request", request.email, request.password);
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/Auth/Login`,{
      email:request.email,
      password:request.password,
      
    });
  }
  setUser(user: User):void{
    this. $user.next(user);
    localStorage.setItem('user-email',  user.email);
    localStorage.setItem('application-user-id',  user.applicationUserId);
    localStorage.setItem('user-roles',  user.roles.join(','));

  }
  User():Observable<User | undefined> {
      return this.$user.asObservable();
  }

}
