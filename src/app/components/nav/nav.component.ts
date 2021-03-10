import { AuthServiceService } from './../../services/auth/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.loginUser(this.model).subscribe(
      data =>{
        console.log("Logged in successfully");
      }, error=>{
        console.log('Failed to log in');
      }
    )
  }

}
