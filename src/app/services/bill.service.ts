
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_BILLS, ADD_BILL, UPLOAD_BILL, UPDATE_BILL } from '../utils/endpoints';
import { IBill } from '../utils/interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private httpService:HttpClient,private authService:AuthService) { }

  async getBills():Promise<IBill[] | undefined>{
    try{
      const response = await this.httpService.get<IBill[]>(GET_BILLS,this.authService.getAuthorizationHeaders()).toPromise();
      return response;
    }catch(err){
      this.authService.handleError(err);
      return;
    }
  }

  async updateBill(billId:string,status:boolean,msg:string){
    try{
      const response = await this.httpService.patch<IBill>(UPDATE_BILL(billId),{status,msg},this.authService.getAuthorizationHeaders()).toPromise();
      this.authService.showSuccess("Updated successfully");
      return response;
    }catch(err){
      this.authService.handleError(err);
      throw err;
    }
  }

  async addBill(name:string,description:string,amount:number,fileData:FormData):Promise<IBill | undefined>{
    try{
      const fileId = await this.httpService.post<any>(UPLOAD_BILL,fileData,this.authService.getAuthorizationHeaders()).toPromise();
      this.authService.showSuccess("File upload successfully");
      const response = await this.httpService.post<IBill>(ADD_BILL,{name,description,amount,fileId},this.authService.getAuthorizationHeaders()).toPromise();
      this.authService.showSuccess("Bill added successfully");
      return response;
    }catch(err){
      console.log(err);
      this.authService.handleError(err);
      throw err;
    }
  }

}
