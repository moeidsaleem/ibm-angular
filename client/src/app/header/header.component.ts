import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,private auth:AuthService) { }
userId;
  ngOnInit() {
    this.userId = localStorage.getItem('uid');
  }


  logout(){
    this.auth.removeUser();
    this.userId = localStorage.getItem('uid');
    this.router.navigate(['/login']);
  }
}
