import { JwtHelperService } from '@auth0/angular-jwt';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { AuthServiceService } from './services/auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  data_info:any = [];
  title = 'datingapp';
  jwtHelper = new JwtHelperService;

  constructor(private auth:AuthServiceService){
  }
  ngOnInit(){
  }
}
