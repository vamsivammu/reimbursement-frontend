import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BillService } from '../services/bill.service';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent implements OnInit {

  addBillFormgroup = new FormGroup({
    name:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    amount:new FormControl('',[Validators.required])
  })
  file:any;
  loading:boolean = false;

  constructor(private billService:BillService,private dialogRef: MatDialogRef<AddBillComponent>) { }

  ngOnInit(): void {
  }

  handleFileChange(e:any){
    if(e.target.files[0].type!='application/pdf'){
      (document.getElementById("fileInput") as any).value = "";
    }else{
      this.file = e.target.files[0];
    }
  }

  async validateForm(){
    if(this.addBillFormgroup.valid && this.file){
      const {name,description,amount} = this.addBillFormgroup.value;
      this.loading = true;
      try{
        const fileData = new FormData();
        fileData.append('file',this.file)
        const newBill = await this.billService.addBill(name,description,amount,fileData);
        this.dialogRef.close(newBill);
      }catch(err){

      }
      this.loading = false;
    }
  }

}
