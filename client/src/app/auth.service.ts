import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {

  userId;
  constructor(private auth:AngularFireAuth) {
   }



   login(email, password){
     return this.auth.auth.signInWithEmailAndPassword(email, password);
   }


   getUser(){
     return localStorage.getItem('uid');
   }

   removeUser(){
     return localStorage.removeItem('uid');
   }
   setUser(uid){
     localStorage.setItem('uid', uid);

   }




}
