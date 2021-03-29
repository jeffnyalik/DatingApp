import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfirmedValidator } from 'src/app/helpers/confirmed.validator';

import { AlertifyService } from './../../../services/alertify/alertify.service';
import { AuthServiceService } from './../../../services/auth/auth-service.service';
import { UserService } from './../../../services/users/user.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 form: FormGroup = new FormGroup({});
 loading = false;
 submitted = false;
 public error = null;
 genders:any;
 countries: any;
 user: any;
 public genderSelected: number;
 public countrySelected: number;
 @Output() cancelRegister = new EventEmitter
  constructor(private formBuilder: FormBuilder, private auth:AuthServiceService,
     private router: Router,
     private serv: UserService,
     private alerts:AlertifyService) { 
    this.form = this.formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'password_confirmation': ['', [Validators.required]],
      'known_as': ['',  Validators.required],
      'dob': [''],
      'gender_id': [''],
      'country_id': ['']
    }, {
      validator: ConfirmedValidator('password', 'password_confirmation')
    });
   
    this.genderSelected = 1;
    this.countrySelected = 1;
  }

  get f(){
    return this.form.controls;
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

  handleError(error:any){
    this.error = error.error.errors;
  }


  onSubmit(){
    this.submitted = true;
    this.loading = true;
    if(this.form.invalid){
      return;
    }else{
      this.auth.registerUser(this.form.value).subscribe(
        data => {
          console.log(data);
          setTimeout(() => {
            this.alerts.success('Registration is successfull, please Log In');
            this.form.reset();
            this.loading = false;
          }, 1000);
        },
        error => {
          // this.handleError(error)
          this.alerts.error('Email has already been taken');
          console.log(error);
          this.loading = false;
        }
      );
    }
  }

  ngOnInit(): void {
    this.serv.getCountries().subscribe(data =>{
      this.countries = data;
      console.log(this.countries);
    });

    //gender
    this.serv.getGenders().subscribe(data =>{
      this.genders = data;
      console.log(this.genders);
    });
  }


}
