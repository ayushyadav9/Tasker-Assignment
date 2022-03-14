import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pending-todo',
  templateUrl: './pending-todo.component.html',
  styleUrls: ['./pending-todo.component.css']
})
export class PendingTodoComponent implements OnInit {
  @Input() task!: any;
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }

  onAccept(){
    let headers = new HttpHeaders({
      "Content-Type": 'application/json',
      "auth-token": `${localStorage.getItem("userToken")}`
    })
    let options = { headers: headers };
    let body = {
      tId:this.task._id,
      title: this.task.title,
      desc: this.task.desc,
      verdict: true
    }
    return this.http.post("http://localhost:5000/api/tasks/taskRequest",body,options).subscribe(
      (res:any)=>{
        console.log(res)
      if(res.success){
        window.location.reload()
      }
    },
    (error)=>{
      console.log(error)
    })
  }
  onReject(){
    let headers = new HttpHeaders({
      "Content-Type": 'application/json',
      "auth-token": `${localStorage.getItem("userToken")}`
    })
    let options = { headers: headers };
    let body = {
      tId:this.task._id,
      title: this.task.title,
      desc: this.task.desc,
      verdict: false
    }
    return this.http.post("http://localhost:5000/api/tasks/taskRequest",body,options).subscribe(
      (res:any)=>{
        console.log(res)
      if(res.success){
        window.location.reload()
      }
    },
    (error)=>{
      console.log(error)
    })
  }

}
