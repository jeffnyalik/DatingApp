import { AlertifyService } from './../services/alertify/alertify.service';
import { Observable, of } from 'rxjs';
import { UserService } from './../services/users/user.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from './../_models/user/user';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';



@Injectable()
export class MemberListResolver implements Resolve<User[]>{
    constructor(private userService: UserService, private router: Router, private alerts: AlertifyService){}
    resolve(route: ActivatedRouteSnapshot):Observable<User[]>{
        return this.userService.getUsers().pipe(
            catchError(error =>{
                this.alerts.error('Failed to retrieve users');
                this.router.navigate(['/home']);
                return of
            })
        );  
    }
}