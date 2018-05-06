//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';
import {RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LoadingModule } from 'ngx-loading';
import { ChartsModule } from 'ng2-charts';

//primeng
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { InputTextModule, ButtonModule, DataTableModule, DialogModule, GalleriaModule, ChartModule } from 'primeng/primeng';
// Components
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component'
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WebrtcService } from './webrtc.service';
import { LearnmoreComponent } from './learnmore/learnmore.component';
import { PricingComponent } from './pricing/pricing.component';
import { DemoComponent } from './demo/demo.component';
import { AboutComponent } from './about/about.component';
import { JoinComponent } from './join/join.component';
import { ResultComponent } from './result/result.component';


//some firebase stuff
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';

var config = {
  apiKey: "AIzaSyAI7aXrdQ3Y_nJAtfbgNMNbupiUjAru3JQ",
  authDomain: "pak-currency-converter.firebaseapp.com",
  databaseURL: "https://pak-currency-converter.firebaseio.com",
  projectId: "pak-currency-converter",
  storageBucket: "pak-currency-converter.appspot.com",
  messagingSenderId: "131798324580"
};

//Atrix Meeting
// This will have landing page, in dashboard=> profile, host, join,
/* I will do the routing as follow 
-- landing page 
-- Login/ Signup 
----Dashboard
   -- Host Meeting 
   -- Join Meeting 


*/

import { RecordRTCComponent } from './record-rtc/record-rtc.component';
import { FileSizePipe } from './file-size.pipe';
import { DropZoneDirective } from './drop-zone.directive';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AuthComponent,
    DashboardComponent,
    RecordRTCComponent,
    LearnmoreComponent,
    PricingComponent,
    DemoComponent,
    AboutComponent,
    JoinComponent,
    ResultComponent,
    FileSizePipe,
    DropZoneDirective,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DataTableModule,
    HttpModule,
    InputTextModule, 
    DialogModule,
    ButtonModule,
    GalleriaModule,
    ChartModule,
    LoadingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ChartsModule,
    RouterModule.forRoot([
      // { 
      //    path:'',
      //    redirectTo:'demo',
      //    pathMatch: 'full'
      // }, 
      { path: 'home',  component : LandingComponent},
      { path:'features', component:LearnmoreComponent},
      { path:'result', component:ResultComponent},
      { path:'result/:id', component:DetailsComponent},
      { path:'demo', component:RecordRTCComponent},
      { path:'about', component:AboutComponent},
      { path:'demo/:id', component:JoinComponent},
   ])
  ],
  providers: [WebrtcService],
  bootstrap: [AppComponent]
})

export class AppModule{

  

  
 }
