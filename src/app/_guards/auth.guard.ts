import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AlertifyService } from './../services/alertify/alertify.service';
import { AuthServiceService } from '../services/auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthServiceService, private route: Router, private alerts: AlertifyService){}
  canActivate(): boolean {
    if(this.auth.loggedIn()){
      return true;
    }
    this.alerts.error('You are not Authorized');
    this.route.navigate(['/home']);
    return false;
  }
  
}
