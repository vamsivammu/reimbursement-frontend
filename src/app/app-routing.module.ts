import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { ROUTE_NAMES } from './utils/constants';

const routes: Routes = [
  {path:ROUTE_NAMES.SIGNIN,component:SigninComponent},
  {path:ROUTE_NAMES.HOME,component:HomeComponent,canActivate:[AuthGuard]},
  {path:'',redirectTo:`/${ROUTE_NAMES.SIGNIN}`,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
