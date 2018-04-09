import { Component, OnInit } from '@angular/core';
import { WebrtcService } from '../webrtc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
results:any;
  constructor(private router:Router,private rtc:WebrtcService) { }

  ngOnInit() {
    this.rtc.getResults().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe(result=>{
      this.results = result;
      console.log(this.results);
    })
  }


  details(x){
    this.rtc.currentResult = x;
    this.router.navigate(['/result/'+x.key]);
  }


}
