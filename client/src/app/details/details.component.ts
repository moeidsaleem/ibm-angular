import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebrtcService } from '../webrtc.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {


  result;
  constructor(private rtc:WebrtcService) { }

  ngOnInit() {
    this.result = this.rtc.currentResult;
  }

  ngOnDestroy(){
    this.rtc.currentResult ={};
  }

}
