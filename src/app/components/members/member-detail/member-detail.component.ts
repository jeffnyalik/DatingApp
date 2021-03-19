import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AlertifyService } from 'src/app/services/alertify/alertify.service';

import { User } from '../../../_models/user/user';
import { UserService } from './../../../services/users/user.service';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: any;
  constructor(private userServ: UserService, 
    private alerts: AlertifyService,
    private http:HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(){
    this.userServ.getUser(this.route.snapshot.params['id'])
    .subscribe((user: User[]) => {
      this.user = user;
      console.log(this.user);

      // this.userServ.getPhotos().subscribe(data =>{
      //   console.log(data);
      // });
    },error => this.alerts.error(error));
  }

}
