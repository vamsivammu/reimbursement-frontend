
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOGOUT, REFRESH, SIGN_IN } from '../utils/endpoints';
import { IUser } from '../utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:IUser | undefined;
  
  constructor(private httpService:HttpClient) { }

  async signin(email:string,password:string){
    try{
      const response = await this.httpService.post<IUser>(SIGN_IN,{email,password},{withCredentials:true}).toPromise();
      this.userData = response;
    }catch(err){
      this.handleError(err);
      throw err;
    }
  }

  async refresh(){
    try{
      const response = await this.httpService.post<IUser>(REFRESH,{},{withCredentials:true}).toPromise();
      this.userData = response;
      return true;
    }catch(err){
      this.handleError(err)
      return false;
    }
  }

  async logout(){
    try{
      await this.httpService.post<any>(LOGOUT,{},{withCredentials:true}).toPromise();
      this.userData = undefined;
      return true;
    }catch(err){
      this.handleError(err)
      return false;
    }
  }

  getAuthorizationHeaders(){
    return {
      headers: new HttpHeaders({
        'Authorization':`Bearer ${this.userData?.token}`
      })
    }
  }

  handleError(err:any){
    console.log(err);
    if(err?.response){
      console.log(err.response);
    }else if(err?.request){
        
    }
  }

}
