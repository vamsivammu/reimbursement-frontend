import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { BillService } from '../services/bill.service';
import { BILL_STATUS, ROLES } from '../utils/constants';
import { IBill } from '../utils/interfaces';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnInit {
  billData:IBill;
  myRole:number;

  approveLoading:boolean = false;
  rejectLoading:boolean = false;
  roles = Object.values(ROLES);
  constructor(
    private dialogRef: MatDialogRef<BillDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private bill: IBill,
    private authService:AuthService,
    private billService:BillService
    ) {
      this.billData = bill;
      this.myRole = this.authService.userData?.role as number;
    }
  
  ngOnInit(): void {
  }

  openFile(){
    let a = document.createElement('a');
    a.href = `https://firebasestorage.googleapis.com/v0/b/reimbursement-94b07.appspot.com/o/${this.billData.fileId}.pdf?alt=media&token=${this.billData.fileId}.pdf`;
    a.target="_blank";
    a.click();
    a.remove();
  }

  isEligibleToUpdate(){
    return this.billData.status == BILL_STATUS.Pending && this.billData.currentAssignedRoleId == this.myRole;
  }

  async updateBill(status:boolean){
    if(status){
      if(confirm("Do you want to accept this request?")){
        this.approveLoading = true;
        try{
          const updatedBill = await this.billService.updateBill(this.billData.id,status,'');
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
          const updatedBill = await this.billService.updateBill(this.billData.id,status,msg);
          this.dialogRef.close(updatedBill);
        }catch(e){

        }
        this.rejectLoading = false;
      }
    }
  }

  getStatus(){
    if(this.billData.status==BILL_STATUS.Accepted){
      return 'Accepted by Admin';
    }
    else if(this.billData.status==BILL_STATUS.Pending){
      return `Pending by ${this.roles[this.billData.currentAssignedRoleId - 1]}`;
    }
    else{
      return `Rejected by ${this.roles[this.billData.currentAssignedRoleId - 1]}. ${this.billData.reason}`;
    }
  }

  isAccepted(){
    return this.billData.status == BILL_STATUS.Accepted;
  }

  isRejected(){
    return this.billData.status == BILL_STATUS.Rejected;
  }

}
