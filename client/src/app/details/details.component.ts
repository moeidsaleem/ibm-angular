import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebrtcService } from '../webrtc.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {


  result;
  sentiments;
  // Doughnut
  public chartLabels:string[] 
  public chartData:any[]

  constructor(private rtc:WebrtcService) { }

  ngOnInit() {
    let data=[];
    let labels=[];
    this.result = this.rtc.currentResult;
   console.log(this.result);

  let cat =this.result.categories;

  //get sentiments 
  // this.rtc


  
    if(this.result.categories.length>0){
      console.log(`categories found`);
      for(let i=0;i<=this.result.categories.length;i++){
        if(this.result.categories[i]){
          let val=this.result.categories[i];
          data.push(Number(val.score));
          labels.push(String(val.label))
        }
       
      }
      this.chartData =data;
      this.chartLabels =labels;
      console.log(this.chartData);

    }

  }
pieChartType ='pie'
public doughnutChartType:string = 'doughnut';

  ngOnDestroy(){
    this.rtc.currentResult ={};
  }



   
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
