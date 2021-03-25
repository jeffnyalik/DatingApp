import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { User } from '../../../_models/user/user';
import { AlertifyService } from '../../../services/alertify/alertify.service';
import { UserService } from '../../../services/users/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[] = [];
  collection: any;
  p: any;

  constructor(private authuser: UserService, private alerts: AlertifyService, private route: ActivatedRoute) {
   }

  ngOnInit(): void {
   this.route.data.subscribe(data =>{
     this.users = data['users'];
     console.log(this.users);
   })
  }


  // loadUsers(){
  //   this.authuser.getUsers().subscribe((users: User[]) => {
  //     this.users = users;
  //     console.log(this.users);
  //   }, error => {
  //     console.log(error);
  //     this.alerts.error('Unauthenticated');
  //   });
  // }

}
