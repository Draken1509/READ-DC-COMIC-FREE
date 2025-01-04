import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    model: LoginRequest;

    constructor(private router:Router, private toastrService: ToastrService,private authService: AuthService,  private cookieService: CookieService) {
    ;
      this.model = {
        email: '',
        password: '',
      
      };
      
    }
    onFormSubmit():void{  
      console.log('this.model', this.model);
      this.authService.login(this.model).subscribe({
        next:(response ) =>{        
        console.log('responses login ', response);
         this.cookieService.set('Authorization',`Bearer ${response.jwtToken}`, undefined,'/',undefined,true,'Strict');          
         this.authService.setUser({
          email: response.email,
          roles: response.roles,
          applicationUserId: response.applicationUserId,
         });
         this.router.navigateByUrl('/');
        },
        error: (err) => {
          console.error('Login failed', err);
          this.toastrService.error(err.error);
        },
      })
    }
  

}
