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
  USER_PROFILE = 'auth/profile';
  UPDATE_PROFILE = 'auth/update-profile';
  COUNTRY_URL = 'user/countries';
  GENDER_URL = 'user/genders';
  PHOTOS_URL = 'user/photos';
  ADD_PHOTOS = 'user/add_photos';
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
 
 getProfile(): Observable<User[]>
 {
   return this.http.get<User[]>(`${this.BASE_URL}${this.USER_PROFILE}`);
 }
 getPhotos(){
   return this.http.get(`${this.BASE_URL}${this.PHOTOS_URL}`);
 }

 updateProfiile(formData: any): Observable<any>{
   return this.http.post(`${this.BASE_URL}${this.UPDATE_PROFILE}`, formData);
 }

 // get countries;
 getCountries(){
   return this.http.get(`${this.BASE_URL}${this.COUNTRY_URL}`);
 }

  // get genders;
 getGenders(){
   return this.http.get(`${this.BASE_URL}${this.GENDER_URL}`);
 }

 //add photos
 addPhotos(formData:any):Observable<any>{
   return this.http.post(`${this.BASE_URL}${this.ADD_PHOTOS}`, formData);
 }

}
