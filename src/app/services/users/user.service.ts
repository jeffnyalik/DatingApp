import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';
import { User } from '../../_models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BASE_URL = environment.BASE_URL;
  USERS_URL = 'auth/users';
  USER_URL = 'auth/user';
  PHOTOS_URL = 'user/photos';
  headers = new HttpHeaders().set('Authorization', 'Bearer' + localStorage.getItem('token'));
  constructor(private http: HttpClient) { }

 getUsers(): Observable<User[]>
 {
   return this.http.get<User[]>(`${this.BASE_URL}${this.USERS_URL}`);
 }

 getUser(id: any): Observable<User[]>
 {
   return this.http.get<User[]>(`${this.BASE_URL}${this.USER_URL}/` + id);
 }
 getPhotos(){
   return this.http.get(`${this.BASE_URL}${this.PHOTOS_URL}`);
 }

}
