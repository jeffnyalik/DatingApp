import { AuthServiceService } from './../../../services/auth/auth-service.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmedValidator } from 'src/app/helpers/confirmed.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 form: FormGroup = new FormGroup({});
 loading = false;
 submitted = false;
 @Output() cancelRegister = new EventEmitter
  constructor(private formBuilder: FormBuilder, private auth:AuthServiceService) { 
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

  onSubmit(){
    this.submitted = true;
    this.loading = true;
    if(this.form.invalid){
      this.loading = false
      return;
    }
    
    this.auth.registerUser(this.form.value).subscribe(
      data => {
        console.log(data);
        console.log('registration is successful');
      }, error=>{
        console.log('Registration has failed');
      }
    )
    console.log('THE FORM HAS BEEN SUBMITTED')
  }

  ngOnInit(): void {
  }

}
