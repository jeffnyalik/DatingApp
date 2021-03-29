import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertifyService } from './../../services/alertify/alertify.service';
import { AuthServiceService } from './../../services/auth/auth-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  user: any = [];
  constructor(public authService: AuthServiceService, private alerts: AlertifyService, private route: Router) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(data => {
      this.user = data;
      console.log(this.user);
    })

    if(!this.authService.loggedIn){
      this.route.navigate(['/']);
    }
  }

  login(){
    this.authService.loginUser(this.model).subscribe(
      data =>{
        this.alerts.success('Logged in successfully');
        this.route.navigate(['/members'])
        window.location.reload();
      }, error=>{
        this.alerts.error('Invalid email or password');
      }
    )
  }

  
  loggedIn(){
    return this.authService.loggedIn();
  }

  logOut(){
    localStorage.removeItem('token');
    this.alerts.success('Logged out successfully');
    this.route.navigate(['']);
  }

}
