import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  BASE_URL = environment.BASE_URL;
  LOGIN_URL = 'auth/login';
  REGISTER_URL = 'auth/register';
  constructor(private http:HttpClient) { }

  loginUser(model:any){
    return this.http.post(`${this.BASE_URL}${this.LOGIN_URL}`, model)
    .pipe(
      map((res:any) =>{
        const user = res;
        if(user){
          localStorage.setItem('token', user.token);
        }
      })
    )
  }

  registerUser(form:any){
    return this.http.post(`${this.BASE_URL}${this.REGISTER_URL}`, form).pipe(
      map((res:any) => res)
    );
  }
}
