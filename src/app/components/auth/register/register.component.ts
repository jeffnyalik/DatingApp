import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfirmedValidator } from 'src/app/helpers/confirmed.validator';

import { AlertifyService } from './../../../services/alertify/alertify.service';
import { AuthServiceService } from './../../../services/auth/auth-service.service';



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
 @Output() cancelRegister = new EventEmitter
  constructor(private formBuilder: FormBuilder, private auth:AuthServiceService, private alerts:AlertifyService) { 
    this.form = this.formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'password_confirmation': ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'password_confirmation')
    })
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
            this.alerts.success('Registration is successfull')
          }, 1000);
        },
        error => {
          // this.handleError(error)
          this.alerts.error('Email has already been taken');
          this.loading = false;
        }
      );
    }
    
    // this.auth.registerUser(this.form.value).subscribe(
    //   data => {
    //     // console.log(data);
    //     this.alerts.success('registration is successful');
    //   }, error=>{
    //     this.alerts.error(error.error.message);
    //   }
    // )
    // console.log('THE FORM HAS BEEN SUBMITTED')
  }

  ngOnInit(): void {
  }

}
