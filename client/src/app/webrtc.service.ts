import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
declare var RTCMultiConnection: any;

@Injectable()
export class WebrtcService {
  connection;
  recorder;
  currentResult;
  loading =false
  constructor(private db:AngularFireDatabase) { 
    //webRTC 
    this.connection = new RTCMultiConnection();
    this.connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
    // this.connection.socketMessageEvent = 'audio-plus-screen-sharing-demo';

  }


  join(id){
   
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
