import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBillComponent } from '../add-bill/add-bill.component';
import { BillService } from '../services/bill.service';
import { IBill, IUser } from '../utils/interfaces';
import {LocalDataSource} from 'ng2-smart-table';  
import { AuthService } from '../services/auth.service';
import { BillDetailsComponent } from '../bill-details/bill-details.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<IBill>;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<IBill>;
  columns = ["name","amount","managerPending","adminPending","createdAt"];  

  bills:IBill[] = [];
  
  source:LocalDataSource | undefined;

  loading:boolean = true;

  userData:IUser|undefined;

  logoutLoading:boolean = false;

  billIndex = -1;
  constructor(private dialog:MatDialog, private billService:BillService, private authService:AuthService, private router:Router) { 
    this.userData = this.authService.userData;
    
  }

  ngOnInit(): void {
    this.getBills();
  }
  
  openAddBillDialog(){
    const dialogRef = this.dialog.open(AddBillComponent);
    const subscription = dialogRef.afterClosed().subscribe((data: IBill)=>{
      if(data){
        console.log(data);
        this.dataSource.data.push(data);
        this.dataSource.data = this.dataSource.data;
      }
      subscription.unsubscribe();
    })
  }

  async getBills(){
    const bills = await this.billService.getBills();
    this.bills = bills || [];
    this.dataSource = new MatTableDataSource(this.bills);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loading = false;
  }

  openBill(data:any,index:number){
    const dialogRef = this.dialog.open(BillDetailsComponent,{data:data,width:"500px"});
    this.billIndex = index;
    const subscribtion = dialogRef.afterClosed().subscribe((data:IBill)=>{
      if(data){
        this.dataSource.data[this.billIndex] = data;
        this.dataSource.data = this.dataSource.data;
        subscribtion.unsubscribe();
      }
    })
  }

  async logout(){
    try{
      this.logoutLoading = true;
      await this.authService.logout();
      this.router.navigateByUrl('/signin');
    }catch(e){
      this.router.navigateByUrl('/signin');
    }
    this.logoutLoading = false;
  }

  getManagerResponse(bill:IBill){
    if(bill.managerPending){
      return "Pending";
    }else{
      return bill?.managerAccepted?"Accepted":"Rejected";
    }
  }

  getAdminResponse(bill:IBill){
    if(bill.managerAccepted){
      return bill.adminPending?"Pending":bill.adminAccepted?"Accepted":"Rejected";
    }
    return bill.managerPending?"Pending":"Closed";
  }

  parseDate(datestring:string){
    return new Date(datestring).toLocaleString();
  }

  isAccepted(bill:IBill){
    if(this.getAdminResponse(bill) == 'Accepted'){
      return true;
    }
    return false;
  }

  isRejected(bill:IBill){
    if(this.getManagerResponse(bill) == 'Rejected' || this.getAdminResponse(bill) == 'Rejected'){
      return true;
    }
    return false;
  }
}
