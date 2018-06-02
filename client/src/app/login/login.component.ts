import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService, private router:Router) { }

  err;
  

  login(user){
    console.log(user);
    this.auth.login(user.email, user.password).then(r=>{
      this.auth.setUser(r.uid);
      location.href ='https://localhost:4200/dashboard';
      // this.router.navigate(['/dashboard'])
      
      

    }, err=>{
      this.err = err.message;
    })
  }
  ngOnInit() {
  }

}
