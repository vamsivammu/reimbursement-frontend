import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ROUTE_NAMES } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.userData?.token){
      return true;
    }else{
      return new Promise(async(resolve,reject)=>{
        const response = await this.authService.refresh();
        if(!response){
          this.router.navigate([ROUTE_NAMES.SIGNIN]);
        }
        resolve(response);
      })
    }

  }
  
}
