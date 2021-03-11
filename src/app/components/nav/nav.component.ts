import { Component, OnInit } from '@angular/core';

import { AlertifyService } from './../../services/alertify/alertify.service';
import { AuthServiceService } from './../../services/auth/auth-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthServiceService, private alerts: AlertifyService) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.loginUser(this.model).subscribe(
      data =>{
        this.alerts.success('Logged in successfully');
      }, error=>{
        this.alerts.error(error);
      }
    )
  }
  
  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  logOut(){
    localStorage.removeItem('token');
    this.alerts.success('Logged out successfully');
  }

}
