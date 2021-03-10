import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  data_info:any = [];
  title = 'datingapp';

  constructor(private http:HttpClient){
    this.http.get('http://127.0.0.1:8000/api/fake-data/faker').subscribe(data =>{
      this.data_info = data;
      console.log(this.data_info);
    }, error=>console.log(error));
  }
}
