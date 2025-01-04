import { CookieService } from 'ngx-cookie-service';
import { CanActivateFn, Router } from '@angular/router';
import { ChangeDetectorRef, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';


export const authGuard: CanActivateFn = (route, state) => {
 const cookieService= inject(CookieService);
 const authService= inject(AuthService);
 const router = inject(Router);
 const user = authService.getUser();
 const toastr =inject(ToastrService);



 let token= cookieService.get('Authorization');

 if(token && user) {
   token = token.replace('Bearer','');

   const decodedToken:any = jwt_decode(token);
   const expirationDate = decodedToken.exp * 1000;
   const currentTime= new Date().getTime();
   

   if(expirationDate<currentTime) {
    authService.logout();
    return router.createUrlTree(['/login'], {queryParams :{returnUrl:state.url}});
   }
   else{
    //Token still valid
    if(user?.roles.includes('Customer')){
        return true;
    }else{
      toastr.error('Unauthorized access', 'Access Denied'); 
      return false;
    }
 } 
  }else{
    authService.logout();

    //alert('This function is only available to users with accounts !');    
    toastr.error('Unauthorized access', 'Access Denied');    
   // return router.createUrlTree(['/login'], {queryParams :{returnUrl:state.url}});
    return false;

  }
};
