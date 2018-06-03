import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { WebrtcService } from '../webrtc.service';
import { Router } from '@angular/router';
import * as RecordRTC from 'recordrtc/RecordRTC.min';
import { Http } from '@angular/http';

//some firebase stuff
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase';


@Component({
  selector: 'record-rtc',
  templateUrl: './record-rtc.component.html',
  styleUrls: ['./record-rtc.component.scss']
})
export class RecordRTCComponent implements AfterViewInit{

  private stream: MediaStream;
  private recordRTC: any;
  completed=false;
  Whammy;
  WhammyRecorder
  StereoAudioRecorder
  
  
// an

  @ViewChild('video') video;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore,public http:Http,private router:Router,private rtc:WebrtcService,private elementRef:ElementRef) {
    // this.Whammy = RecordRTC.Whammy;
    // this.WhammyRecorder = RecordRTC.WhammyRecorder;
    this.StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
   
    let y = document.getElementById('remote');
    this.rtc.connection.onstream = function(event){
      y = document.getElementById('local');
      y.appendChild(event.mediaElement);

 

      // if(event.type === 'remote'){
      //   // console.error('remote event');
      //   this.y.appendChild(event.mediaElement);
      //   console.log('remote')

      // }else if( event.type === 'local'){
      //  console.log('local event');
      //   this.x.appendChild(event.mediaElement);
      // }
    }

   }


  started:boolean = false;
  roomId:any;


  rand5 = function() {
    return(Math.floor(Math.random() * 5*2) + 2003 *32)
  };



  joinRoom(){
    this.rtc.join(this.roomId);
  }
  valuex=2;

//   getBlob() {
//     return blobURL;
// }

  openRoom(){

    this.started=true;
    this.rtc.open(this.roomId);
    setTimeout(()=>{
      this.startRecording();

    },2000);   
}
stopRoom(){
  // this.rtc.loading =true;
  this.rtc.connection.close();  
  this.stopRecording();

setTimeout(()=>{
  this.rtc.loading=false;
  this.started =false;
  //this.router.navigate(['/result']);
},1000);
}

test(){
  console.log('working test')
  this.http.post('http://localhost:3000/test', {
    name:'Moeid',
    operator:'123'
  }).subscribe(res=>{
    console.log(res);
  })
}

// RECORD_RTC

  ngAfterViewInit() {
    // set the initial state of the video
    let video:HTMLAudioElement = this.video.nativeElement;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;
  }

  toggleControls() {
    let video: HTMLAudioElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }

  successCallback(stream: MediaStream) {

    var options = {
    recorderType: this.StereoAudioRecorder,
    mimeType: 'audio/wav' ,
    type:'audio',
    // numberOfAudioChannels: 9 , 
    bufferSize: 16384,
    audioBitsPerSecond: 128000,
       //type: 'audio'
   //   audioBitsPerSecond: 128000,
   //   videoBitsPerSecond: 128000,
   //  bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    let video: HTMLAudioElement = this.video.nativeElement;
    video.src = window.URL.createObjectURL(stream);
    this.toggleControls();
  }

  errorCallback() {
    //handle error here
  }


  accessAPI(dataURL){
 

  }

  processVideo(audioVideoWebMURL) {
    let video: HTMLAudioElement = this.video.nativeElement;
    let recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    this.toggleControls();
    let d;
    

    var fileType = 'audio'; // or "audio"
var fileName = 'ABCDEF.wav';  // or "wav"
var recordedBlob = recordRTC.getBlob();

var formData = new FormData();
formData.append('blob', recordedBlob);

   // recordRTC.getDataURL(function (dataURL) {
      // console.log(dataURL); 
     // d= dataURL;
    // });
    //  setTimeout(()=>{
    //    console.log('got it working ')
    //    let data ={ operator:'operator1',media: recordedBlob}
    //    this.http.post('http://localhost:3000/api', formData).subscribe(res=>{
    //      console.log(res);
    //    })
    //  },2400)
  }

  mediaConstraints;
  startRecording() {
    this.startTimer();
    this.mediaConstraints = {
      video: false, audio: true
    };
    navigator.mediaDevices
      .getUserMedia(this.mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));


  }

  stopRecording() {
    this.endTimer();
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
    this.completed =true;
  setTimeout(()=>{
    this.download();
  },2000)  
  }

  download() {
    this.recordRTC.save('audio.wav');
   
  }




  // FIREBASE STORAGE :::::::::::::::::::::



  
  // Main task 
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;

  uploadErr ='';
  
  toggleHover(event: boolean) {
    this.isHovering = event;
  }


  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'audio') { 
      console.error('unsupported file type :( ')
      this.uploadErr = 'unsupported file type :( ! Please upload audio file for processing..'
      return;
    }
       //   this.uploadErr = ''


    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges()
    // .pipe(
    //   tap(snap => {
    //     console.log(snap)
    //     if (snap.bytesTransferred === snap.totalBytes) {
    //       // Update firestore on completion
    //       this.db.collection('photos').add( { path, size: snap.totalBytes })
    //     }
    //   })
    // )


    // The file's download URL
    this.downloadURL = this.task.downloadURL()



    this.downloadURL.subscribe(respx=>{
      console.log(respx);
      let reqBody = {
        audio: respx, 
        operator: this.roomId,
        type: this.type,
        callDuration: this.tick, // in seconds 
        // timestamp: firebase.database
      }
      console.log(reqBody); 
     // Now this is where we generate results... 
     this.rtc.loading=true;
     this.http.post('http://localhost:3000/chalo', reqBody)
     .map(res => res.json())
     .subscribe(response =>{
      this.rtc.loading=false;

       console.log(response);
       //now this is where the response comes of the audio transaction ID in firebase of the result 
       this.rtc.currentResult = response;
      this.router.navigate(['result/'+ response.operator]);
     });


    })
    
  }



  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }


  

  type='';

  onchange(event){
    console.log(event.target.value);
    this.type = event.target.value;
  }


  //TIMER :::::::::::::::

  private tick: any;
  private timerSubscription: Subscription;



  startTimer(){
    let timer = TimerObservable.create(2000, 1000);
    this.timerSubscription = timer.subscribe(t => {
      this.tick = t;
     // console.log(this.tick);
    });

  }
  endTimer(){
    this.timerSubscription.unsubscribe();
  }

  
}
