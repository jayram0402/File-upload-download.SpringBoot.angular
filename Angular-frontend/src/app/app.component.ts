import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { log } from 'console';
import { format } from 'path';

interface User {
  userName: string;
  displayPicture: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent implements OnInit {
  title = 'angular-file-upload-download';

  userName!: string;
  selectedFile!:File;

  userList: User[] = [];

  constructor(private httpClient: HttpClient) { }
  ngOnInit(): void {

    this.getUserList();

  }
  private getUserList() {
    this.httpClient.get<User[]>("http://localhost:8080/user").subscribe(response => {
      this.userList = response;


    }, error => {
      console.log("error occured while fetching user list");
    });
  }

  onFileSelected(event:any){
    this.selectedFile=event.target.files[0];
  }
  save():void{
 
   const formData=new FormData();
   formData.append("name",this.userName);
   formData.append("file",this.selectedFile);
   
    this.httpClient.post("http://localhost:8080/user",formData).subscribe(response=>{
      console.log(response);
      this.getUserList();
    },error=>{
      console.log(error);
    });
    console.log("saved");

  }
}
