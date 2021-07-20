import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ROUTE_NAMES } from '../utils/constants';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInFormgroup = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)])
  })
  loading:boolean = false;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  validateForm(){
    if(this.signInFormgroup.valid){
      this.signIn();
    }
  }

  async signIn(){
    const {email,password} = this.signInFormgroup.value;
    this.loading = true;
    
    const isLoginSuccess = await this.authService.signin(email,password);
    if(isLoginSuccess){
      this.router.navigate([ROUTE_NAMES.HOME]);
    }

    this.loading = false;
  }

}
