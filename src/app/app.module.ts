import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { Test1Component } from './components/test1/test1.component';
import { SampleDataService } from './services/sampleData.service';
import { BannerComponent } from './banner/banner.component';
import { Banner1Component } from './banner1/banner1.component';
import { Banner2Component } from './banner2/banner2.component';
import { Banner3Component } from './banner3/banner3.component';


@NgModule({
  declarations: [
    AppComponent,
    Test1Component,
    BannerComponent,
    Banner1Component,
    Banner2Component,
    Banner3Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    SampleDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
