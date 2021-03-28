import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlertifyService } from 'src/app/services/alertify/alertify.service';

import { User } from '../../../_models/user/user';
import { AuthServiceService } from './../../../services/auth/auth-service.service';
import { UserService } from './../../../services/users/user.service';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: any;
  phoneNumber: boolean = false;
  emailAddress: boolean = false;
  slideChangeMessage = '';

  log(event: number) {
    this.slideChangeMessage = `Image has been switched: ${event}`;
  }
  constructor(private userServ: UserService, 
    private alerts: AlertifyService,
    private auth: AuthServiceService,
    private http:HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data['user'];
      console.log(this.user);
    });
  }

  showEmail(){
    this.emailAddress =!this.emailAddress;
  }

  showPhone(){
    console.log('Phone number');
  }

  loggedIn(){
    return this.auth.loggedIn();
  }

  // loadUser(){
  //   this.userServ.getUser(this.route.snapshot.params['id'])
  //   .subscribe((user: User[]) => {
  //     this.user = user;
  //     console.log(this.user);
  //   },error => this.alerts.error(error));
  // }

}
