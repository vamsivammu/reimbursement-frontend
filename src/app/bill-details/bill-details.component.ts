import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { BillService } from '../services/bill.service';
import { IBill } from '../utils/interfaces';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnInit {
  billData:IBill;
  myRole:string;

  approveLoading:boolean = false;
  rejectLoading:boolean = false;
  
  constructor(
    private dialogRef: MatDialogRef<BillDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private bill: IBill,
    private authService:AuthService,
    private billService:BillService
    ) {
      this.billData = bill;
      this.myRole = this.authService.userData?.role as string;
    }
  
  ngOnInit(): void {
  }
  
  getManagerResponse(){
    if(this.billData?.managerPending){
      return "Pending";
    }else{
      return this.billData?.managerAccepted?"Accepted":`Rejected. ${this.billData?.managerRejectionReason}`;
    }
  }

  openFile(){
    let a = document.createElement('a');
    a.href = `https://firebasestorage.googleapis.com/v0/b/reimbursement-94b07.appspot.com/o/${this.billData.fileId}.pdf?alt=media&token=${this.billData.fileId}.pdf`;
    a.target="_blank";
    a.click();
    a.remove();
  }

  getAdminResponse(){
    if(this.billData?.managerAccepted){
      return this.billData?.adminPending?"Pending":this.billData?.adminAccepted?"Accepted":`Rejected. ${this.billData?.adminRejectionReason}`;
    }
    return this.billData?.managerPending?"Pending":"Closed";
  }

  isEligibleToUpdate(){
    if(this.myRole=="Developer") return false;
    if(this.myRole=="Manager" && this.billData.managerPending) return true;
    if(this.myRole=="Admin" && this.billData.adminPending) return true;
    return false;
  }

  async updateBill(status:boolean){
    if(status){
      if(confirm("Do you want to accept this request?")){
        this.approveLoading = true;
        try{
          const updatedBill = await this.billService.updateBill(this.billData.id,status,'',this.myRole);
          this.dialogRef.close(updatedBill);
        }catch(e){

        }
        this.approveLoading = false;
      }
    }else{
      const msg = prompt("Please enter the reason for your rejection..","No reason");
      if(msg){
        this.rejectLoading = true;
        try{
          const updatedBill = await this.billService.updateBill(this.billData.id,status,msg,this.myRole);
          this.dialogRef.close(updatedBill);
        }catch(e){

        }
        this.rejectLoading = false;
      }
    }
  }

}
