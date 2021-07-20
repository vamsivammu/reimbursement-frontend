import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SigninComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { AddBillComponent } from './add-bill/add-bill.component';
import { BillDetailsComponent } from './bill-details/bill-details.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { BillService } from './services/bill.service';
import { AuthGuard } from './guards/auth.guard';
import { MatSortModule } from '@angular/material/sort';
import {ToastrModule} from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    AddBillComponent,
    BillDetailsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule,
    MatDialogModule,
    MatToolbarModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthService,BillService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
