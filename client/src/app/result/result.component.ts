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
public barChartData:any[]

  constructor(private router:Router,private rtc:WebrtcService) { }

  ngOnInit() {
    this.rtc.getResults().map(actions => {
      return actions.map(action => ({ key: action.key, ...action.payload.val() }));
    }).subscribe(result=>{
      this.results = result;
      console.log(this.results);
      // this.chartData = this.results;
      let arr=[];
      let pieArr=[];
      let data=[0,0,0]; //operator 1,2,3
      for(let i=0;i<this.results.length;i++){
        arr.push({data: [ this.results[i].callDuration, this.results[i].characters], label: this.results[i].operator});
        // pieArr.push({data: [ this.results[i].callDuration, this.results[i].characters]});
        if(this.results[i].operator == 'operator1'){
          data[0]+= this.results[i].callDuration;
        }else if(this.results[i].operator == 'operator2'){
          data[1]+= this.results[i].callDuration;
        }else if(this.results[i].operator == 'operator3'){
          data[2]+= this.results[i].callDuration;
        }

          //duration, characters
      }

        this.barChartData = arr;
        this.pieChartData =data;

      this.barChartLabels = ['operator 1', 'operator 2','operator 3']
    })
  }


  details(x){
    this.rtc.currentResult = x;
    this.router.navigate(['/result/'+x.key]);
  }



  chartOptions = {
    responsive: true
  };

  chartData
  //  = [
  //   { data: [330, 600, 260, 700], label: 'Account A' },
  //   { data: [120, 455, 100, 340], label: 'Account B' },
  //   { data: [45, 67, 800, 500], label: 'Account C' }
  // ];

  chartLabels = ['January', 'February', 'Mars', 'April'];

  onChartClick(event) {
    console.log(event);
  }


  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[]
  //  = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  //  = [
  //   {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
  //   {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  // ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

  // Pie
  public pieChartLabels:string[]= ['operator1', 'operator2', 'operator3'];
  public pieChartData:number[] 
  //= [300, 500, 100];
  public pieChartType:string = 'pie';
  public polarAreaChartType:string = 'polarArea';
  public radarChartType:string = 'radar';
  public lineChartType:string = 'line';





}
