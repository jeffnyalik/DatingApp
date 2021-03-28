import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReadVarExpr } from '@angular/compiler';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

import { AlertifyService } from './../../../services/alertify/alertify.service';
import { UserService } from './../../../services/users/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  formModel: FormGroup = new FormGroup({});
  @ViewChild('editForm') editForm:any = NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue = true
    }
  }
  public user: any = [];
  urls: any = [];
  file: any;
  public countries: any;
  public genders: any;
  public imagSrc: string = '';

  constructor(private authUser: UserService, private alerts: AlertifyService, 
    private router: Router,
    private http:HttpClient,
    private fb: FormBuilder) {
    this.formModel =  this.fb.group({
       city: [''],
       name: [''],
       age: [''],
       image: [''],
       username: [''],
       knownAs: [''],
       known_as: [''],
       bio: [''],
       looking_for: [''],
       interests: [''],
       language: [''],
       country_id: [''],
       gender_id: '',

      // photos parameter
      caption: [''],
      photos: [''],
       dob: Date,
    });
  }
 
  onSelectImage(event:any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.formModel.get('image')!.setValue(file);
      console.log(file);
    }
  }

  ngOnInit(): void {
    
    this.authUser.getProfile().subscribe((data) => {
      this.user = data;
      console.log(this.user);

      //get genders and countries;

      this.authUser.getCountries().subscribe(data => 
        {
          this.countries = data
          console.log(this.countries);
        }, error=>{console.log(error)});
      this.authUser.getGenders().subscribe(data => 
        {
          this.genders = data;
          console.log(this.genders);
        }, error=>{console.log(error)});
    })
  }

 
  selectFiles(event: any){
    if(event.target.files){
      for(let i = 0; i<event.target.files.length; i++){
        // this.file = event.target.files[i];
        this.urls.push(event.target.files[i]);
  
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
          reader.onload = (event: any) =>{
            this.urls.push(event.target.result);
            this.formModel.get('photos')!.setValue(this.urls);
          }
      }
      console.log(this.urls);
    }
  }

  updateUser(){
    let formData = new FormData();
    // formData.append('image', this.selectedFile, this.selectedFile.name);
    formData.append('image', this.formModel.get('image')!.value);
    formData.append('name', this.formModel.get('name')!.value);
    formData.append('city', this.formModel.get('city')!.value);
    formData.append('known_as', this.formModel.get('known_as')!.value);
    formData.append('bio', this.formModel.get('bio')!.value);
    formData.append('looking_for', this.formModel.get('looking_for')!.value);
    formData.append('interests', this.formModel.get('interests')!.value);
    formData.append('language', this.formModel.get('language')!.value);
    formData.append('country_id', this.formModel.get('country_id')!.value);
    formData.append('gender_id', this.formModel.get('gender_id')!.value);
    formData.append('age', this.formModel.get('age')!.value);
    formData.append('dob', this.formModel.get('dob')!.value);
    
    this.authUser.updateProfiile(formData).subscribe(data =>{
      this.alerts.success('Profile updated successfully.');
      this.editForm.reset(this.user);
      this.router.navigate(['/members']);
    }, error=>{
      this.alerts.error('An error has ocurred');
    });
    
  }


  /**
   * Add photos to the database;
   * 
   */
  addGallery(){
    let fd = new FormData();
    for (let i = 0; i < this.urls.length; i++) { 
      fd.append("photos[]", this.urls[i]);
    }
    fd.append('caption', this.formModel.get('caption')!.value);
    // this.http.post<any>('http://127.0.0.1:8000/api/user/add_photos', fd).subscribe(
    //   (res) => console.log(res),
    //   (err) => console.log(err)
    // );
    
    this.authUser.addPhotos(fd).subscribe(data =>{
      this.alerts.success('Uploaded Successfully.');
      this.router.navigate(['/members'])
      console.log(data);
    }, error =>{
      this.alerts.error('An error has occured');
      console.log(error);
    });
  }

}
