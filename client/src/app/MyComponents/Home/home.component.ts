import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  Tasks: any[] = []
  PendingTasks: any[] = []
  User!: string

  title!: string
  description!: string

  constructor(private http : HttpClient) {
    this.getUser()
  }

  getUser (){
    let headers = new HttpHeaders({
      "Content-Type": 'application/json',
      "auth-token": `${localStorage.getItem("userToken")}`
    })
    let options = { headers: headers };
    return this.http.post("http://localhost:5000/api/auth/getUser",null,options).subscribe(
      (res:any)=>{
        console.log(res)
      if(res.success){
        this.Tasks = res.user.createdTasks
        this.PendingTasks = res.user.pendingTasks
        this.User = res.user.name
      }
    },
    (error)=>{
      console.log(error)
    })
  }

  onSubmit(){
    let headers = new HttpHeaders({
      "Content-Type": 'application/json',
      "auth-token": `${localStorage.getItem("userToken")}`
    })
    let options = { headers: headers };
    let body = {
      title: this.title,
      desc:this.description
    }
    return this.http.post("http://localhost:5000/api/tasks/addTask",body,options).subscribe(
      (res:any)=>{
        console.log(res)
      if(res.success){
        this.getUser()
      }
    },
    (error)=>{
      console.log(error)
    })
  }

  ngOnInit(): void {}
}
