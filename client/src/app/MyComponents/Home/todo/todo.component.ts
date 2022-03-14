import { Component, Input, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() task!: any;
  shareEmail!: string;
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
  }

  onClick(){
    console.log("Onccc")
  }

  onShare(){
    let headers = new HttpHeaders({
      "Content-Type": 'application/json',
      "auth-token": `${localStorage.getItem("userToken")}`
    })
    let options = { headers: headers };
    let body = {
      toEmail:this.shareEmail,
      title: this.task.title,
      desc: this.task.desc
    }
    return this.http.post("http://localhost:5000/api/tasks/shareTask",body,options).subscribe(
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

