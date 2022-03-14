import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email!:string
  password!:string

  constructor(private http:HttpClient, private _router:Router) { }

  ngOnInit(): void {
  }

  onSubmit = ()=>{
    let headers = new HttpHeaders({
      "Content-Type": 'application/json',
    })
    let body = {
      email: this.email,
      password: this.password
    }

    let options = { headers: headers };
    return this.http.post("http://localhost:5000/api/auth/login",body,options).subscribe(
      (res:any)=>{
        console.log(res)
      if(res.success){
        localStorage.setItem("userToken",res.authToken)
        this._router.navigate(['/'])
      }
    },
    (err)=>{
      console.log(err.error)
    })
  }

}
