import { Component, OnInit } from '@angular/core';

import { UserService } from './../../services/users/user.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  photos: any;
  p: any;
  constructor(private auth: UserService) { }

  ngOnInit(): void {
    this.auth.getPhotos().subscribe(data =>{
      this.photos = data;
      console.log(this.photos);
    }, error=>{
      console.log(error);
    })
  }

}
