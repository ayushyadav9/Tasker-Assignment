import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  name!:string
  email!:string
  password!:string

  constructor(private http:HttpClient,private _router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    let headers = new HttpHeaders({
      "Content-Type": 'application/json',
    })
    let body = {
      name: this.name,
      email: this.email,
      password: this.password
    }

    let options = { headers: headers };
    return this.http.post("http://localhost:5000/api/auth/createUser",body,options).subscribe(
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
