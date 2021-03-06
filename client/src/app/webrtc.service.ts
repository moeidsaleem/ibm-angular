import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
declare var RTCMultiConnection: any;
import {Http } from '@angular/http'

@Injectable()
export class WebrtcService {
  connection;
  recorder;
  currentResult;
  loading =false
  constructor(private db:AngularFireDatabase, private http:Http) { 
    //webRTC 
    this.connection = new RTCMultiConnection();
    this.connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
    // this.connection.socketMessageEvent = 'audio-plus-screen-sharing-demo';

  }
  


//add problem to system>app> solvedProblems, errorProblems 
addProblem(operator, problem){
  let n = new Date();
  if(problem === false){
    return this.db.list('system/solvedProblems').push({
      operator: operator,
      problem:false,
      date: n.getUTCDate()
    })


  }else if(problem === true){
    return this.db.list('system/errorProblems').push({
      operator: operator,
      problem:true,
      date: n.getUTCDate()
    })


  }
}

getProblems(type){
  return this.db.list('system/'+type).valueChanges();
}



  getSentiments(text){
    return this.http.post('http://localhost:3000/sentiments', { text: text});
  }
  join(id){
   
// this.connection.session = {
//   audio: true,
//   video: false
// };
this.connection.mediaConstraints = {
  audio: true,
  video: false
};
// this.connection.sdpConstraints.mandatory = {
//   OfferToReceiveAudio: true,
//   OfferToReceiveVideo: false
// };
//checking up contstraints 
  this.connection.join(id);
    
  }
  



  open(id){
 
this.connection.session = {
    audio: true,
    video: false
};
this.connection.mediaConstraints = {
    audio: true,
    video: false
};
this.connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: false
};
console.log('openiing with settings');
    this.connection.open(id);
  }


  stopRecording(id){
    this.connection.close();
   return this.recorder[id].stopRecording();

  }


  // The main service for WebRTC 



  //Angular STuff
  

  getResults(){
   return this.db.list('result').snapshotChanges()
  }
}
